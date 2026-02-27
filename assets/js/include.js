document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  const loadInclude = async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (response.ok) {
        const content = await response.text();
        el.innerHTML = content;

        // Re-initialize scripts or icons if needed after injection
        // For example, if we use Phosphor icons, we might need to tell it to replace <i> tags
        if (window.PhosphorIcons) {
          PhosphorIcons.replace();
        }
      } else {
        console.error(`Could not include file: ${file}`);
      }
    } catch (error) {
      console.error(`Error including file: ${file}`, error);
    }
  };

  Promise.all(Array.from(includes).map(loadInclude)).then(() => {
    // Dispatch an event when all includes are loaded
    document.dispatchEvent(new Event("includes-loaded"));
  });
});
