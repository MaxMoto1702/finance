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
                document.errors.reject('balanceDocument.processing.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
    }

    def rollback(BalanceDocument document) {
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
                    document.errors.reject('balanceDocument.rollback.notNotAllowed')
                    transactionStatus.setRollbackOnly()
                    return
                }
            }
        }
    }

    BalanceDocument save(BalanceDocument document) {
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
    }
}
