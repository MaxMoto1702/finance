package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

import java.time.Period

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(OperationService)
@Mock([Operation, Balance, Account])
class OperationServiceSpec extends Specification {

    def setup() {
        def account = new Account(
                name: 'test',
                balance: new Balance(
                        date: new Date(2015, 11, 30),
                        amount: 100.00
                )
        ).save flush: true
        def incomeOperaration = new Operation(product: new Product(name: 'test income'), amount: 1000.00, account: account, type: OperationType.INCOME, period: Period.ofYears(2016), date: new Date()).save flush: true
        def expenseOperaration = new Operation(product: new Product(name: 'test expense'), amount: 500.00, account: account, type: OperationType.EXPENSE, period: Period.ofYears(2016), date: new Date()).save flush: true
    }

    def cleanup() {
    }

    void "test close period"() {
        when: "close current period"
        service.closeCurrentPeriod()

        then:
        Account.findByName('test').balance.amount == 100.00 + 1000.00 - 500.00
    }
}
