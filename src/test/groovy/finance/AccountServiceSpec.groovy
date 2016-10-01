package finance

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

import java.time.Period

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(AccountService)
@Mock([Account, Balance, Operation])
class AccountServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test save without balance"() {
        given:
        def account = new Account(name: 'without balance')

        when:
        service.save(account)

        then:
        Account.countByName('without balance') == 1
        Account.findByName('without balance').balance.amount == 0.00
        Account.findByName('without balance').balance.date != null
    }

    void "test save without balance amount"() {
        given:
        def account = new Account(name: 'without balance amount')

        when:
        service.save(account)

        then:
        Account.countByName('without balance amount') == 1
        Account.findByName('without balance amount').balance.amount == 0.00
        Account.findByName('without balance amount').balance.date != null
    }

    void "test save without balance date"() {
        given:
        def account = new Account(name: 'without balance date')

        when:
        service.save(account)

        then:
        Account.countByName('without balance date') == 1
        Account.findByName('without balance date').balance.amount == 0.00
        Account.findByName('without balance date').balance.date != null
    }

    void "test can remove account"() {
        given:
        def balance = new Balance(date: new Date(), amount: 0.00)
        def account = new Account(name: 'removable account', balance: balance).save flush: true

        when:
        service.delete(account)

        then:
        Account.countByName('removable account') == 0
    }

    void "test can not remove account"() {
        given:
        def balance = new Balance(date: new Date(), amount: 0.00)
        def account = new Account(name: 'removable account', balance: balance)
        account.addToOperations(new Operation(product: new Product(name: 'test'), amount: 0.00, type: OperationType.INCOME, period: Period.ZERO, date: new Date()))

        when:
        service.delete(account)

        then:
        Account.countByName('removable account') == 0
    }
}
