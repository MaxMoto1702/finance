package finance

import grails.transaction.Transactional

@Transactional
class ExchangeDocumentService {

    def processing(ExchangeDocument document) {
//        for (ExchangeDocumentRow row in document.rows) {
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
}
