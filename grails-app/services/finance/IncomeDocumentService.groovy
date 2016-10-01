package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class IncomeDocumentService {

    def process(IncomeDocument document) {
        def company = Company.findByName(document.companyName) ?: new Company(name: document.companyName).save(flush: true)
        println company
        for (IncomeDocumentRow row in document.rows) {
            def operation = new Operation(
                    product: new Product(name: row.productName),
                    amount: row.amount,
                    account: document.account,
                    company: company,
                    date: document.date,
                    period: Period.ofYears(document.date.getYear() + 1900),
                    type: OperationType.INCOME
            )
            if (operation.validate()) {
                operation.save flush: true
                row.operation = operation
                row.save(flush: true)
            } else {
                document.errors.reject('incomeDocument.process.notNotAllowed')
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

    def revoke(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            if (row.operation.closeDate == null) {
                def operation = row.operation
                row.operation = null
                row.save(flush: true)
                operation.delete(flush: true)
            } else {
                document.errors.reject('incomeDocument.revoke.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
        document.status = DocumentStatus.REVOKED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }

    IncomeDocument save(IncomeDocument document) {
        document.status = DocumentStatus.CREATED
        def amount = document.rows.sum { IncomeDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate())
            document.save flush: true
        else
            println(document.errors)
    }

    def delete(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            if (row.operation) {
                document.errors.reject('incomeDocument.delete.notAllowed')
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
