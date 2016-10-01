package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(ExpenseDocumentService)
@Mock([Account, ExpenseDocument, ExpenseDocumentRow, Operation])
class ExpenseDocumentServiceSpec extends Specification {

    def setup() {
        def account = new Account(name: 'test', balance: new Balance(date: new Date(), amount: 0.00)).save(flush: true)
        def expenseDocument = new ExpenseDocument(
                account: account,
                company: new Company(name: 'test company'),
                date: new Date(),
                amount: 1000.00,
                description: 'test income',
                status: DocumentStatus.CREATED
        )
        expenseDocument.addToRows(new ExpenseDocumentRow(product: 'test income product', amount: 1000.00))
        if (expenseDocument.validate()) expenseDocument.save(flush: true) else println(expenseDocument.errors)
    }

    def cleanup() {
    }

    void "test save document"() {
        given:
        def document = new ExpenseDocument(
                account: Account.first(),
                company: new Company(name: 'test company'),
                date: new Date(),
                description: 'test'
        )
        document.addToRows(new ExpenseDocumentRow(product: 'test', amount: 500.00))
        document.addToRows(new ExpenseDocumentRow(product: 'test', amount: 250.00))

        when:
        service.save(document)

        then:
        ExpenseDocument.findByDescription('test').amount == 750.00
        ExpenseDocument.findByDescription('test').status == DocumentStatus.CREATED
    }

    void "test processing income document"() {
        given:
        def document = ExpenseDocument.findByDescription('test income')

        when:
        service.process(document)

        then:
        Operation.countByProduct('test income product') == 1
        Operation.findByProduct('test income product').amount == 1000.00
    }
}
