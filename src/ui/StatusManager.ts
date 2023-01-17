import Util from "../util/Util";

export default class StatusManager {
    
    domFrame: object;
    
    createDOM() {
        this.domFrame = document.getElementById('status');
    }
}