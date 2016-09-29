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
class ForAfterFailureSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "broken test for after_failure"() {
        expect:
            true == false
    }
}
