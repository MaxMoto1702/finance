package finance

import grails.transaction.Transactional

@Transactional
class BalanceDocumentService {

    def accountService

    def process(BalanceDocument document) {
        for (BalanceDocumentRow row in document.rows) {
            def account = new Account(
                    name: row.accountName,
                    balance: new Balance(
                            date: new Date(),
                            amount: row.amount
                    )
            )
            if (account.validate()) {
                account.save()
//                account.save(flush: true)
                row.account = account
                row.save(flush: true)
            } else {
                document.errors.reject('balanceDocument.process.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
        document.status = DocumentStatus.PROCESSED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }

    def revoke(BalanceDocument document) {
//        для каждой записи документа найти счет
        for (BalanceDocumentRow row in document.rows) {
//        удалить счет
//        если имеются ошибки прерываем операцию
//        сообщаем об ошибках
            if (row.account) {
                def account = row.account
                row.account = null
                row.save()
                accountService.delete(account)
                if (account.hasErrors()) {
                    document.errors.reject('balanceDocument.revoke.notNotAllowed')
                    transactionStatus.setRollbackOnly()
                    return
                }
            }
        }
        document.status = DocumentStatus.REVOKED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }

    BalanceDocument save(BalanceDocument document) {
        document.status = DocumentStatus.CREATED
        def amount = document.rows.sum { BalanceDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate())
            document.save flush: true
        else
            log.error("${document.errors}")
    }

    BalanceDocument delete(BalanceDocument document) {
        for (BalanceDocumentRow row in document.rows) {
            if (row.account) {
                document.errors.reject('balanceDocument.delete.notAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
//        document.delete(flush: true)
        document.status = DocumentStatus.DELETED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }
}
