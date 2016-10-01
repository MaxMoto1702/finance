package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class ExchangeDocumentService {

    def process(ExchangeDocument document) {
        def incomeOperation = new Operation(
                product: 'transfer',
                amount: document.amount,
                account: document.targetAccount,
                date: document.date,
                period: Period.ofYears(document.date.getYear() + 1900),
                type: OperationType.INCOME
        )
        if (incomeOperation.validate()) {
            incomeOperation.save flush: true
            document.incomeOperation = incomeOperation
            document.save(flush: true)
        } else {
            document.errors.reject('exchangeDocument.processing.notNotAllowed')
            transactionStatus.setRollbackOnly()
            return
        }
        def expenseOperation = new Operation(
                product: 'transfer',
                amount: document.amount,
                account: document.sourceAccount,
                date: document.date,
                period: Period.ofYears(document.date.getYear() + 1900),
                type: OperationType.EXPENSE
        )
        if (expenseOperation.validate()) {
            expenseOperation.save flush: true
            document.expenseOperation = expenseOperation
            document.save(flush: true)
        } else {
            document.errors.reject('exchangeDocument.processing.notNotAllowed')
            transactionStatus.setRollbackOnly()
        }
    }

    def rollback(ExchangeDocument document) {
        if (document.incomeOperation.closeDate == null && document.expenseOperation.closeDate == null) {
            def incomeOperation = document.incomeOperation
            def expenseOperation = document.expenseOperation
            document.incomeOperation = null
            document.expenseOperation = null
            document.save(flush: true)
            incomeOperation.delete(flush: true)
            expenseOperation.delete(flush: true)
        } else {
            document.errors.reject('exchangeDocument.rollback.notNotAllowed')
            transactionStatus.setRollbackOnly()
        }
    }

    def delete(ExchangeDocument document) {
        if (document.incomeOperation || document.expenseOperation) {
            document.errors.reject('exchangeDocument.delete.notAllowed')
            transactionStatus.setRollbackOnly()
            return
        }
        document.delete(flush: true)
    }
}
