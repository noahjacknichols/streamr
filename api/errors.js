class RouteError extends Error() {
    constructor(status, message){
        super(message);
        this.name = "devError";
        this.status = status;
    }
}