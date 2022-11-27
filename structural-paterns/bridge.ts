abstract class UI {
  protected backend: Backend;

  constructor(backend: Backend) {
    this.backend = backend;
  }

  abstract render(): void;
}

interface Backend {
  getData(): string;
}

class WebUI extends UI {
  public render() {
    console.log("WebUI: Rendering data from the backend");
    const data = this.backend.getData();
    console.log(data);
  }
}

class WebBackend implements Backend {
  public getData() {
    return "WebBackend: Data from the backend";
  }
}

class AndroidUI extends UI {
  public render() {
    console.log("AndroidUI: Rendering data from the backend");
    const data = this.backend.getData();
    console.log(data);
  }
}

class IPhoneUI extends UI {
  public render() {
    console.log("IPhoneUI: Rendering data from the backend");
    const data = this.backend.getData();
    console.log(data);
  }
}

class MobileBackend implements Backend {
  public getData() {
    return "MobileBackend: Data from the backend";
  }
}

// Client code

const webBackend = new WebBackend();
const webUI = new WebUI(webBackend);
webUI.render();

const mobileBackend = new MobileBackend();
const androidUI = new AndroidUI(mobileBackend);
androidUI.render();

const iphoneUI = new IPhoneUI(mobileBackend);
iphoneUI.render();
