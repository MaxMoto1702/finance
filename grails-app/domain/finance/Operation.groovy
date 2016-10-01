package finance

import java.time.Period

class Operation {

    Product product
    BigDecimal amount
    Account account
    Company company
    OperationType type
    Period period
    Date date
    Date closeDate

    static constraints = {
        company nullable: true
        closeDate nullable: true
    }
}
