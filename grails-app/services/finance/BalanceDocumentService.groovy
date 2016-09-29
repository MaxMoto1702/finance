package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class BalanceDocumentService {

    def processing(BalanceDocument document) {
//        for (BalanceDocumentRow row in document.rows) {
//            def operation = new Operation(
//                    product: row.product,
//                    amount: row.amount,
//                    account: document.account,
//                    date: document.date,
//                    period: Period.ofYears(document.date.getYear() + 1900)
//            )
//            switch (document.type) {
//                case DocumentType.EXPENSE:
//                    operation.type = OperationType.EXPENSE
//                    break
//                case DocumentType.INCOME:
//                    operation.type = OperationType.INCOME
//                    break
//            }
//            operation.save flush: true
//        }
    }

    BalanceDocument save(BalanceDocument document) {
        def amount = document.rows.sum { BalanceDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate())
            document.save flush: true
        else
            log.error("${document.errors}")
    }
}
