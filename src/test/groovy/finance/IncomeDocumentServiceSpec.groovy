package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(IncomeDocumentService)
@Mock([Account, IncomeDocument, IncomeDocumentRow, Operation])
class IncomeDocumentServiceSpec extends Specification {

    def setup() {
        def account = new Account(name: 'test', balance: new Balance(date: new Date(), amount: 0.00)).save(flush: true)
        def incomeDocument = new IncomeDocument(
                account: account,
                company: new Company(name: 'test company'),
                date: new Date(),
                amount: 1000.00,
                description: 'test income',
                status: DocumentStatus.CREATED
        )
        incomeDocument.addToRows(new IncomeDocumentRow(product: 'test income product', amount: 1000.00))
        if (incomeDocument.validate()) incomeDocument.save(flush: true) else println(incomeDocument.errors)
    }

    def cleanup() {
    }

    void "test save document"() {
        given:
        def document = new IncomeDocument(
                account: Account.first(),
                company: new Company(name: 'test company'),
                date: new Date(),
                description: 'test'
        )
        document.addToRows(new IncomeDocumentRow(product: 'test', amount: 500.00))
        document.addToRows(new IncomeDocumentRow(product: 'test', amount: 250.00))

        when:
        service.save(document)

        then:
        IncomeDocument.findByDescription('test').amount == 750.00
        IncomeDocument.findByDescription('test').status == DocumentStatus.CREATED
    }

    void "test processing income document"() {
        given:
        def document = IncomeDocument.findByDescription('test income')

        when:
        service.process(document)

        then:
        Operation.countByProduct('test income product') == 1
        Operation.findByProduct('test income product')?.amount == 1000.00
    }
}
