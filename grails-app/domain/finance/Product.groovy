package finance

class Product {

    String name
    Product parent

    static constraints = {
        parent nullable: true
    }
}
