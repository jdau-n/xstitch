import Util from "../util/Util";

export default class StatusManager {
    
    domFrame: object;
    
    createDOM() {
        this.domFrame = document.getElementById('status');
        if (this.domFrame == undefined) { Util.error("No status frame"); }
        
    }
}