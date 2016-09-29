package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(BalanceDocumentService)
@Mock([Account, BalanceDocument, BalanceDocumentRow, Operation])
class BalanceDocumentServiceSpec extends Specification {

    def setup() {
//        def incomeDocument = new BalanceDocument(
//                account: account,
//                company: 'test company',
//                date: new Date(),
//                amount: 1000.00,
//                description: 'test income'
//        )
//        incomeDocument.addToRows(new BalanceDocumentRow(product: 'test income product', amount: 1000.00))
//        if (incomeDocument.validate()) incomeDocument.save(flush: true) else println(incomeDocument.errors)
//
//        def expenseDocument = new BalanceDocument(
//                account: account,
//                company: 'test company',
//                date: new Date(),
//                amount: 1000.00,
//                description: 'test expense'
//        )
//        expenseDocument.addToRows(new BalanceDocumentRow(product: 'test expense product', amount: 500.00))
//        if (expenseDocument.validate()) expenseDocument.save(flush: true) else println(expenseDocument.errors)
    }

    def cleanup() {
    }

    void "test save document"() {
        given:
        def document = new BalanceDocument(
                date: new Date(),
                description: 'test'
        )
        document.addToRows(new BalanceDocumentRow(accountName: 'Account #1', amount: 500.00))
        document.addToRows(new BalanceDocumentRow(accountName: 'Account #2', amount: 250.00))

        when:
        service.save(document)

        then:
        BalanceDocument.findByDescription('test')?.amount == 750.00
    }

//    void "test processing income document"() {
//        given:
//        def document = Document.findByDescription('test income')
//
//        when:
//        service.processing(document)
//
//        then:
//        Operation.countByProduct('test income product') == 1
//        Operation.findByProduct('test income product').amount == 1000.00
//    }
//
//    void "test processing expense document"() {
//        given:
//        def document = Document.findByDescription('test expense')
//
//        when:
//        service.processing(document)
//
//        then:
//        Operation.countByProduct('test expense product') == 1
//        Operation.findByProduct('test expense product').amount == 500.00
//    }
}
