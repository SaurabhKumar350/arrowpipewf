document.addEventListener("includes-loaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const desktopSidebarToggle = document.getElementById("desktop-sidebar-toggle");
  const overlay = document.getElementById("sidebar-overlay");
  const mainContent = document.getElementById("main-content");

  // Desktop Sidebar Toggle
  if (desktopSidebarToggle && sidebar && mainContent) {
    desktopSidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("lg:translate-x-0");
      mainContent.classList.toggle("lg:ml-72");
    });
  }

  // Mobile Sidebar Toggle
  if (sidebarToggle && sidebar && overlay) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      overlay.classList.toggle("hidden");
      // Prevent body scroll when sidebar is open on mobile
      if (!overlay.classList.contains("hidden")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  // Submenu Toggle
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      // Prevent default link behavior if it's an anchor
      e.preventDefault();

      const submenu = toggle.nextElementSibling;
      const chevron = toggle.querySelector(".chevron-icon");

      // Toggle active state styling on the parent item
      toggle.classList.toggle("bg-red-50");
      toggle.classList.toggle("text-red-600");

      if (submenu) {
        submenu.classList.toggle("hidden");
        if (chevron) {
          chevron.classList.toggle("rotate-180");
        }
      }
    });
  });

  // User Profile Dropdown Toggle
  const userMenuButton = document.getElementById("user-menu-button");
  const userMenuDropdown = document.getElementById("user-menu-dropdown");

  if (userMenuButton && userMenuDropdown) {
    userMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userMenuButton.contains(e.target) && !userMenuDropdown.contains(e.target)) {
        userMenuDropdown.classList.add("hidden");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Priority Dropdown Logic
  const priorityDropdowns = document.querySelectorAll(".priority-dropdown");

  priorityDropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".priority-btn");
    const menu = dropdown.querySelector(".priority-menu");
    if (!menu) return;
    const options = dropdown.querySelectorAll(".priority-option");
    const span = btn.querySelector("span");
    const icon = btn.querySelector("i");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close other dropdowns first
      closeAllDropdowns(menu);
      
      menu.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const priority = option.getAttribute("data-priority");
        span.textContent = priority;

        // Reset classes
        btn.className = "priority-btn inline-flex items-center justify-between w-24 px-3 py-1.5 text-xs font-bold border rounded-md focus:outline-none transition-colors";

        // Apply new classes based on priority
        if (priority === "High") {
          btn.classList.add("text-[#EF3826]", "border-[#EF3826]/20", "bg-[#EF3826]/10");
        } else if (priority === "Medium") {
          btn.classList.add("text-[#E2B000]", "border-[#E2B000]/20", "bg-[#E2B000]/10");
        } else if (priority === "Low") {
          btn.classList.add("text-[#339D56]", "border-[#339D56]/20", "bg-[#339D56]/10");
        }

        menu.classList.add("hidden");
        icon.classList.remove("rotate-180");
      });
    });
  });

  // Status Dropdown Logic
  const statusDropdowns = document.querySelectorAll(".status-dropdown");
  statusDropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".status-btn");
    const menu = dropdown.querySelector(".status-menu");
    if (!menu) return;
    const options = dropdown.querySelectorAll(".status-option");
    const span = btn.querySelector("span");
    const icon = btn.querySelector("i");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllDropdowns(menu);
      menu.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const status = option.getAttribute("data-status");
        const bgClass = option.getAttribute("data-bg");
        span.textContent = status;

        // Reset classes (keep common ones)
        btn.className = "status-btn inline-flex items-center justify-between w-full px-2 py-1.5 text-xs font-bold text-white rounded-md uppercase focus:outline-none transition-colors " + bgClass;

        menu.classList.add("hidden");
        icon.classList.remove("rotate-180");
      });
    });
  });

  // Assigned Dropdown Logic
  const assignedDropdowns = document.querySelectorAll(".assigned-dropdown");
  assignedDropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".assigned-btn");
    const menu = dropdown.querySelector(".assigned-menu");
    if (!menu) return;
    const options = dropdown.querySelectorAll(".assigned-option");
    
    // Select name span (first span in the new layout without dot)
    const nameSpan = btn.querySelector("span"); 
    const icon = btn.querySelector("i.ph-caret-down, i.ph-caret-up");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllDropdowns(menu);
      menu.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const name = option.getAttribute("data-name");
        
        if (nameSpan) nameSpan.textContent = name;
        
        // Remove selected state from all options
        options.forEach(opt => {
            opt.classList.remove("bg-red-50", "border-l-4", "border-[#EF3826]");
            opt.classList.add("hover:bg-gray-50", "pl-2"); // Add back default padding/hover
            opt.classList.remove("pl-1"); // Remove reduced padding of selected state
        });

        // Add selected state to clicked option
        option.classList.remove("hover:bg-gray-50", "pl-2");
        option.classList.add("bg-red-50", "border-l-4", "border-[#EF3826]", "pl-1");
        
        menu.classList.add("hidden");
        if (icon) icon.classList.remove("rotate-180");
      });
    });
  });

  // Helper function to close all open dropdowns
  function closeAllDropdowns(exceptMenu = null) {
    const allMenus = document.querySelectorAll(".priority-menu, .status-menu, .assigned-menu, #user-menu-dropdown");
    const allIcons = document.querySelectorAll(".priority-btn i, .status-btn i, .assigned-btn i");
    
    allMenus.forEach(m => {
      if (m !== exceptMenu) m.classList.add("hidden");
    });
    allIcons.forEach(i => {
      if (!exceptMenu || !exceptMenu.parentElement.contains(i)) {
        i.classList.remove("rotate-180");
      }
    });
  }

  // Global click to close dropdowns
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".priority-dropdown") && 
        !e.target.closest(".status-dropdown") && 
        !e.target.closest(".assigned-dropdown")) {
      closeAllDropdowns();
    }
  });

  // Global scroll to close dropdowns (capture phase)
  document.addEventListener("scroll", (e) => {
    // Check if scrolling inside the dropdown menu itself
    if (e.target.closest(".assigned-menu") || 
        e.target.closest(".priority-menu") || 
        e.target.closest(".status-menu")) {
      return;
    }
    closeAllDropdowns();
  }, true);

  // Intersection Observer for Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Progress Bars (Width)
        if (target.classList.contains('progress-bar-fill')) {
          const width = target.getAttribute('data-width');
          if (width) {
            // Force reflow
            void target.offsetWidth;
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                target.style.width = width;
            });
          }
        }

        // Vertical Bars (Height)
        if (target.classList.contains('vertical-bar-fill')) {
          const height = target.getAttribute('data-height');
          if (height) {
            // Force reflow
            void target.offsetWidth;
            requestAnimationFrame(() => {
                target.style.height = height;
            });
          }
        }

        // Gauge Chart Path
        if (target.classList.contains('gauge-path')) {
          const length = target.getTotalLength();
          // Disable transition to set initial state instantly
          target.style.transition = 'none';
          target.style.strokeDasharray = length;
          target.style.strokeDashoffset = length;
          
          // Trigger reflow
          target.getBoundingClientRect();
          
          // Re-enable transition (clear inline style to use CSS)
          target.style.transition = '';
          
          setTimeout(() => {
              target.style.strokeDashoffset = '0';
          }, 50);
        }

        // Conic Chart Animation
        if (target.classList.contains('conic-chart-animate')) {
          target.classList.add('visible');
        }

        // Map Dots
        if (target.classList.contains('map-dot')) {
          target.classList.add('visible');
        }

        // Stop observing after animation triggers
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Select and observe elements
  const animatedElements = document.querySelectorAll(
    '.progress-bar-fill, .vertical-bar-fill, .gauge-path, .conic-chart-animate, .map-dot'
  );
  
  animatedElements.forEach(el => observer.observe(el));

  // Generic Dropdown Logic (data-dropdown-toggle)
  document.addEventListener('click', function(event) {
    const toggle = event.target.closest('[data-dropdown-toggle]');
    const dropdown = event.target.closest('.dropdown-menu');

    // If clicked on a toggle
    if (toggle) {
      const targetId = toggle.getAttribute('data-dropdown-toggle');
      const targetDropdown = document.getElementById(targetId);

      // Close all other dropdowns
      document.querySelectorAll('[data-dropdown-toggle]').forEach(t => {
        const id = t.getAttribute('data-dropdown-toggle');
        if (id !== targetId) {
          const d = document.getElementById(id);
          if (d) d.classList.add('hidden');
        }
      });

      // Toggle the clicked one
      if (targetDropdown) {
        targetDropdown.classList.toggle('hidden');
      }
      
      return;
    }

    // If clicked inside a dropdown, do nothing
    if (dropdown) {
        return;
    }

    // Click outside - close all
    document.querySelectorAll('[data-dropdown-toggle]').forEach(t => {
        const id = t.getAttribute('data-dropdown-toggle');
        const d = document.getElementById(id);
        if (d) d.classList.add('hidden');
    });
  });

  const topBar = document.getElementById("top-bar");
  if (topBar) {
    const onScroll = () => {
      if (window.scrollY > 4) {
        topBar.classList.remove("bg-[#F2F2F2]");
        topBar.classList.add("bg-white", "border-b", "border-gray-200", "shadow-sm");
      } else {
        topBar.classList.add("bg-[#F2F2F2]");
        topBar.classList.remove("bg-white", "border-b", "border-gray-200", "shadow-sm");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});

// Global function for Status Select (Table)
window.updateStatusColor = function(select) {
  // Colors defined by user:
  // New: #BA29FF (Purple)
  // Repeated: #6226EF (Indigo/Purple)
  // In Review: #E2B000 (Gold/Yellow)
  // Rejected (Offer Rejected): #979797 (Gray)
  // High: #E60004 (Red)
  // Closed: #979797 (Gray) - keeping consistent with Rejected/Closed usually being neutral
  // Regret: #E60004 (Red) - using High color for Regret as well or maybe keep Orange? 
  // User didn't specify Regret/Closed explicitly but "Rejected" and "High". 
  // I will map High to a new status option "High".
  
  const colors = {
    'New': 'bg-[#BA29FF] text-white border-transparent',
    'Repeated': 'bg-[#6226EF] text-white border-transparent',
    'In Review': 'bg-[#E2B000] text-white border-transparent',
    'Offer Rejected': 'bg-[#979797] text-white border-transparent',
    'High': 'bg-[#E60004] text-white border-transparent',
    'Closed': 'bg-gray-500 text-white border-transparent', // Defaulting to standard gray if not specified
    'Regret': 'bg-orange-500 text-white border-transparent' // Defaulting to standard orange
  };
  
  const allColorClasses = new Set();
  Object.values(colors).forEach(clsStr => {
    clsStr.split(' ').forEach(c => allColorClasses.add(c));
  });
  
  // Also remove old classes just in case
  const oldClasses = [
    'bg-purple-50', 'text-purple-700', 'border-purple-200',
    'bg-indigo-50', 'text-indigo-700', 'border-indigo-200',
    'bg-teal-50', 'text-teal-700', 'border-teal-200',
    'bg-red-50', 'text-red-700', 'border-red-200',
    'bg-gray-50', 'text-gray-500', 'border-gray-200',
    'bg-orange-50', 'text-orange-700', 'border-orange-200'
  ];
  oldClasses.forEach(c => allColorClasses.add(c));
  
  const classesToRemove = [];
  select.classList.forEach(cls => {
    if (allColorClasses.has(cls)) {
      classesToRemove.push(cls);
    }
  });
  classesToRemove.forEach(cls => select.classList.remove(cls));
  
  if (colors[select.value]) {
    const newClasses = colors[select.value].split(' ');
    select.classList.add(...newClasses);
  }
};
