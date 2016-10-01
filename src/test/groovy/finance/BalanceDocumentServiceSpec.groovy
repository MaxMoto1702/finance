package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(BalanceDocumentService)
@Mock([Account, Balance, BalanceDocument, BalanceDocumentRow, Operation, AccountService])
class BalanceDocumentServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test save document"() {
        given:
        def document = new BalanceDocument(date: new Date(), description: 'test')
        document.addToRows(new BalanceDocumentRow(accountName: 'Account #1', amount: 500.00))
        document.addToRows(new BalanceDocumentRow(accountName: 'Account #2', amount: 250.00))

        when:
        service.save(document)

        then:
        BalanceDocument.findByDescription('test')?.amount == 750.00
    }

    void "test process balance document"() {
        given:
        def document = new BalanceDocument(date: new Date(), amount: 1000.00, description: 'test process', status: DocumentStatus.CREATED)
        document.addToRows(new BalanceDocumentRow(accountName: 'test process', amount: 1000.00))
        if (!document.save(flush: true)) println(document.errors)

        when:
        service.process(document)

        then:
        Account.countByName('test process') == 1
        Account.findByName('test process')?.balance?.amount == 1000.00
    }

    void "test rollback balance document"() {
        given:
        def account = new Account(name: 'test revoke')
        def document = new BalanceDocument(date: new Date(), description: 'test', status: DocumentStatus.PROCESSED)
        document.addToRows(new BalanceDocumentRow(accountName: 'Account #1', amount: 500.00, account: account))
        if (!document.save(flush: true)) println(document.errors)

        when:
        service.revoke(document)

        then:
        Account.countByName('test revoke') == 0
    }

//    void "test deny revoke balance document"() {
//        given:
//        def account = new Account(name: 'test deny revoke')
//        def operation = new Operation(product: 'test income', amount: 1000.00, account: account, type: OperationType.INCOME, period: Period.ofYears(2016), date: new Date()).save flush: true
//        def document = new BalanceDocument(date: new Date(), description: 'test')
//        document.addToRows(new BalanceDocumentRow(accountName: 'Account #1', amount: 500.00, account: account))
//        if (!document.save(flush: true)) println(document.errors)
//
//        when:
//        service.revoke(document)
//
//        then:
//        Account.countByName('test deny revoke') == 1
//    }
}
