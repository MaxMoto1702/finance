package finance

class Account {

    String name

    static hasOne = [
            balance: Balance
    ]

    static hasMany = [
            operations: Operation
    ]

    static constraints = {
        balance nullable: true
    }
}
