package finance

class ExchangeDocument {

    Date date
    Account sourceAccount
    Account targetAccount
    BigDecimal amount
    String description

    static constraints = {
    }
}
