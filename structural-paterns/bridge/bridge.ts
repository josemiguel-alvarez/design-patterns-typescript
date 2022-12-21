abstract class UI {
  protected backend: Backend;

  constructor(backend: Backend) {
    this.backend = backend;
  }

  abstract render(): void;
}

abstract class Backend {
  abstract getData(): string;
}

class WebUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("WebUI: Rendering data from the backend ->", data);
  }
}

class WebBackend implements Backend {
  public getData() {
    return "WebBackend: Data from the backend";
  }
}

class AndroidUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("AndroidUI: Rendering data from the backend ->", data);
  }
}

class IPhoneUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("IPhoneUI: Rendering data from the backend ->", data);
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

const androidBrowserUI = new AndroidUI(webBackend);
androidBrowserUI.render();
