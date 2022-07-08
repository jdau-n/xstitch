export default class Util {

    // Overload class
    static error(message: String): null;
    static error(message: String, obj: object): null;
    static error(message: String, obj?: object) {
        this.errorState();
        console.log(message, obj);
    }
    
    static errorState() {
        var body = document.body;
        body.classList.add("error");
    }
}