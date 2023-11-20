const installButton = document.getElementById("awp-install-button");

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<UserChoice>;
} & Event;

type UserChoice = {
  outcome: "accepted" | "dismissed";
};

let promptEvent: BeforeInstallPromptEvent;

window.addEventListener("beforeinstallprompt", (e) => (promptEvent = e as BeforeInstallPromptEvent));

if (installButton) {
  installButton.addEventListener("click", () => {
    if (promptEvent) {
      promptEvent.prompt();
      return;
    }
    alert("No useInstall event");
  });
}
