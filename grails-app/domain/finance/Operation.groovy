package finance

import java.time.Period

class Operation {

    String product
    BigDecimal amount
    Account account
    OperationType type
    Period period
    Date date
    Date closeDate

    static constraints = {
        closeDate nullable: true
    }
}
