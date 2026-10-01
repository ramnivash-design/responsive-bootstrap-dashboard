/* ==========================================================================
   NIMBUS ADMIN DASHBOARD — CUSTOM SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------------------
       1. ACTIVE MENU HANDLING
       Applies the "active" state to whichever sidebar link is clicked,
       and keeps the desktop sidebar and mobile offcanvas sidebar in sync.
       ---------------------------------------------------------------------- */
    function initActiveMenu() {
        // Select every sidebar link across BOTH the desktop sidebar and
        // the mobile offcanvas sidebar so their states stay synchronized.
        var allNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');

        allNavLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                var menuKey = link.getAttribute('data-menu');
                if (!menuKey) return;

                // Remove "active" from all links (desktop + mobile)
                allNavLinks.forEach(function (l) {
                    l.classList.remove('active');
                });

                // Add "active" to every link matching the same menu key
                // (keeps desktop sidebar and offcanvas sidebar in sync)
                document
                    .querySelectorAll('.sidebar-nav .nav-link[data-menu="' + menuKey + '"]')
                    .forEach(function (l) {
                        l.classList.add('active');
                    });

                // Close the mobile offcanvas sidebar after selecting a menu item
                var offcanvasEl = document.getElementById('sidebarOffcanvas');
                if (offcanvasEl) {
                    var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. SIDEBAR TOGGLE (Desktop collapse — optional enhancement)
       Allows the fixed desktop sidebar to collapse into an icon-only
       rail when the toggle button is pressed, giving more room to
       the main content area on smaller desktop / laptop screens.
       ---------------------------------------------------------------------- */
    function initSidebarCollapse() {
        var sidebar = document.getElementById('sidebar');
        var toggleBtn = document.querySelector('.sidebar-toggle-btn');

        if (!sidebar || !toggleBtn) return;

        // On desktop widths, clicking the toggle button collapses/expands
        // the sidebar instead of opening the offcanvas (offcanvas is
        // reserved for mobile via Bootstrap's data attributes).
        toggleBtn.addEventListener('click', function () {
            if (window.innerWidth >= 992) {
                sidebar.classList.toggle('sidebar-collapsed');
                document.querySelector('.main-content').classList.toggle('content-expanded');
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. DROPDOWN ENHANCEMENTS
       Bootstrap handles the dropdown toggle logic automatically via
       data attributes, but we add a small close-on-outside-click
       safety net and prevent dropdown links with "#" from jumping
       the page to the top.
       ---------------------------------------------------------------------- */
    function initDropdowns() {
        var dropdownItems = document.querySelectorAll('.custom-dropdown .dropdown-item');

        dropdownItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                if (item.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. CARD HOVER (JS-assisted micro interaction)
       CSS handles the primary hover transform/shadow; this adds a
       subtle "lift" class toggle so hover state can also be reused
       for touch devices via a tap event if desired.
       ---------------------------------------------------------------------- */
    function initCardHover() {
        var statCards = document.querySelectorAll('.stat-card');

        statCards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                card.classList.add('is-hovered');
            });
            card.addEventListener('mouseleave', function () {
                card.classList.remove('is-hovered');
            });
        });
    }

    /* ----------------------------------------------------------------------
       5. SALES ANALYTICS RANGE TOGGLE
       Switches the active state between Week / Month / Year buttons
       on the Sales Analytics panel (visual-only demo behaviour).
       ---------------------------------------------------------------------- */
    function initRangeToggle() {
        var rangeButtons = document.querySelectorAll('.range-btn');

        rangeButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                rangeButtons.forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });
    }

    /* ----------------------------------------------------------------------
       6. QUICK ACTION BUTTON FEEDBACK
       Provides simple visual feedback (temporary "Processing..." state)
       when a Quick Action button is clicked. In a production build,
       these would trigger modals or navigation.
       ---------------------------------------------------------------------- */
    function initQuickActions() {
        var actionButtons = document.querySelectorAll('.quick-action-btn');

        actionButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var originalHTML = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processing...';

                setTimeout(function () {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 1200);
            });
        });
    }

    /* ----------------------------------------------------------------------
       7. RESPONSIVE BEHAVIOUR HELPER
       Automatically closes the mobile offcanvas sidebar if the viewport
       is resized up to desktop width while it happens to be open,
       preventing a stuck overlay when rotating a device or resizing
       a browser window.
       ---------------------------------------------------------------------- */
    function initResponsiveBehaviour() {
        window.addEventListener('resize', function () {
            var offcanvasEl = document.getElementById('sidebarOffcanvas');
            if (!offcanvasEl) return;

            if (window.innerWidth >= 992) {
                var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            }
        });
    }

    /* ----------------------------------------------------------------------
       8. INITIALIZE ALL MODULES
       ---------------------------------------------------------------------- */
    initActiveMenu();
    initSidebarCollapse();
    initDropdowns();
    initCardHover();
    initRangeToggle();
    initQuickActions();
    initResponsiveBehaviour();

});
