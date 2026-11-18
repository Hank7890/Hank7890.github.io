(function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  var icon = toggle.querySelector("i");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  applyTheme(document.documentElement.getAttribute("data-theme") || "light");

  toggle.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
    if (!localStorage.getItem("theme")) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
})();

(function () {
  var zh = (document.documentElement.lang || "").indexOf("zh") === 0;
  var toast = null;
  var toastTimer = null;

  function showToast(text) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "copy-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 1800);
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {}
    document.body.removeChild(area);
    return ok;
  }

  function onCopied(link, email) {
    showToast((zh ? "已复制 " : "Copied ") + email);
    var state = link.parentElement && link.parentElement.querySelector(".copy-state");
    if (state) {
      state.textContent = zh ? "已复制" : "copied";
      clearTimeout(state._timer);
      state._timer = setTimeout(function () {
        state.textContent = "";
      }, 1800);
    }
  }

  document.querySelectorAll(".copy-email").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var email = link.getAttribute("data-email");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          onCopied(link, email);
        }, function () {
          if (fallbackCopy(email)) onCopied(link, email);
          else window.prompt(zh ? "手动复制邮箱地址：" : "Copy the address manually:", email);
        });
      } else if (fallbackCopy(email)) {
        onCopied(link, email);
      } else {
        window.prompt(zh ? "手动复制邮箱地址：" : "Copy the address manually:", email);
      }
    });
  });
})();
