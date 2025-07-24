import Image from "next/image";
import CaseStudy from './components/CaseStudy';
import BeforeAfterMockup from './components/BeforeAfterMockup';

export default function Home() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <div style={{
        width: '100%',
        marginBottom: 32,
        background: 'linear-gradient(90deg, #059669 0%, #2563eb 100%)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 8, color: '#fff', textAlign: 'left', letterSpacing: '-0.01em' }}>
          My Contributions to Enterprise Apps as QA
        </h1>
      </div>
      <p style={{ color: '#555', marginBottom: 32 }}>
      A portfolio of real-world UX, UI, and QA improvements I introduced to enterprise web apps. Each case study highlights my approach to usability, accessibility, and performance, beyond core testing responsibilities as a QA Software Analyst. All examples are anonymized      </p>
      <CaseStudy
        title="Case Study 1 - Report Form With Good Defaults"
        beforeDesc="The report creation form had many parameters, but no defaults for required fields. Users had to manually select a date range and a 'Sort By' option every time, which was tedious."
        afterDesc="By analyzing user trends in our database audit log, I identified that most users selected a small date range of just the most recent days and almost always sorted by date descending. Based on this data, I recommended adding default values: a date range of 2 weeks from the current day, and a default sort of date descending. This made the form much faster to complete."
        impactDesc="Reduced time to print from 7 clicks to ~3 clicks (in the average case)"
        before={<BeforeAfterMockup type="report-form-defaults" show="before" />}
        after={<BeforeAfterMockup type="report-form-defaults" show="after" />}
      />
      <CaseStudy
        title="Case Study 2 - Visual Indicator When Filtering Data"
        beforeDesc="The data grid could be filtered to show only priority members, but there were no visual indicators in the grid itself to reflect this. Since the app consistently used icons in both filter labels and data rows to signal context, users often overlooked that they were viewing a filtered subset."
        afterDesc="I recommended applying the app’s existing pattern of showing icons in both filter labels and data grid rows, adding the star icon for priority members to maintain consistency."
        impactDesc="Improved user awareness, and promoted use of the company's established UI patterns to ensure consistency across the app."
        before={<BeforeAfterMockup type="priority-members" show="before" />}
        after={<BeforeAfterMockup type="priority-members" show="after" />}
      />
      <CaseStudy
        title="Case Study 3 - Responsive Button Row"
        beforeDesc="A row of action buttons (e.g., Print PDF, Print CSV) above a data grid would wrap onto a new line on medium/small screens. The wrapped buttons were misaligned and lacked margin, causing them to touch and appear cluttered. This issue was overlooked as development was done on large desktop screens, but was evident on typical end-user devices like laptops."
        afterDesc="I recommended and helped implement a responsive layout for the button row, ensuring buttons aligned properly and maintained consistent spacing and margin even when wrapping on smaller screens."
        impactDesc="Improved usability and visual consistency for users on laptops and smaller devices. The issue was confirmed via end-client screenshots in a support ticket, validating the real-world impact."
        before={<BeforeAfterMockup type="responsive-buttons" show="before" />}
        after={<BeforeAfterMockup type="responsive-buttons" show="after" />}
      />
      <CaseStudy
        title="Case Study 4 - PDF Report Row Height Optimization"
        beforeDesc="A column with 9-digit IDs was too narrow, causing the last digit to wrap to a new line. This doubled the row height for every entry, resulting in unnecessarily large PDF reports (thousands of pages for big clients)."
        afterDesc="I recommended and helped implement a slightly wider column so the full ID fit on one line, making each row single-height."
        impactDesc="PDF reports became much more compact, reducing page count by half and saving clients money on printing paper."
        before={<BeforeAfterMockup type="pdf-row-height" show="before" />}
        after={<BeforeAfterMockup type="pdf-row-height" show="after" />}
      />
      <CaseStudy
        title="Case Study 5 - Lazy Loading Dropdown Content"
        beforeDesc="On a screen with multiple filter dropdowns and a data grid, each filter’s dropdown options were fetched from the API as soon as the page loaded, regardless of whether the user interacted with the filters. This resulted in unnecessary network activity and slower initial load times, especially when many filters were present."
        afterDesc="I recommended and helped implement a change so that each filter only fetched its dropdown data from the API when the user actually clicked to open that filter. This reduced unnecessary network requests."
        impactDesc="More efficient use of resources, especially for users who didn’t interact with all filters. Reduced initial network traffic and server load. Faster page load for users"
        before={<BeforeAfterMockup type="on-demand-filters" show="before" />}
        after={<BeforeAfterMockup type="on-demand-filters" show="after" />}
      />
      <CaseStudy
        title="Case Study 6 - Caching Dropdown Content"
        beforeDesc="The app’s filter dropdowns were configured to fetch their options from the API every time a dropdown was opened, even for dropdowns whose options rarely or never changed. This resulted in unnecessary network requests and slower perceived performance for users who frequently opened and closed the same filters."
        afterDesc="I identified which filters had static data and recommended caching their results after the first API call. For these filters, the app now served cached data instantly on subsequent openings."
        impactDesc="Reduced redundant network requests for static filter data. Faster, more responsive filter dropdowns for users. Lower server load and improved scalability."
        before={<BeforeAfterMockup type="filter-caching" show="before" />}
        after={<BeforeAfterMockup type="filter-caching" show="after" />}
      />
      <CaseStudy
        title="Case Study 7 - Accessibility: Dropdown Focus Order for Screen Readers and Mobile Gestures"
        beforeDesc="In the mobile app, when a user navigated to a dropdown and opened it, the next swipe gesture did not move focus to the first dropdown option. Instead, it skipped to the next UI element outside the dropdown. Only after swiping through all other UI elements could the user finally reach the dropdown options. This made dropdowns very difficult to use for those relying on the screen reader's swipe navigation feature."
        afterDesc="I recommended updating the dropdown logic so that when the dropdown was opened, the next swipe/tab moved focus directly to the first dropdown option, matching accessibility standards."
        impactDesc="Dropdowns are now accessible and usable for screen reader users. Improved compliance with accessibility standards. Reduced user frustration and increased inclusivity."
        before={<BeforeAfterMockup type="dropdown-focus-accessibility" show="before" />}
        after={<BeforeAfterMockup type="dropdown-focus-accessibility" show="after" />}
      />
      <CaseStudy
        title="Case Study 8 - Accessibility: Improving Modal Close Icon Visibility"
        beforeDesc="In modal dialogs (of which there were roughly 200 across the app), both a 'Cancel' button and an 'X' icon (top right) could close the modal. However, the 'X' icon’s color was nearly identical to its background, resulting in very low contrast. This made it hard to see for many users, especially those with visual impairments. An accessibility color checker confirmed the issue."
        afterDesc="I recommended updating the 'X' icon’s color to ensure sufficient contrast with its background, following accessibility guidelines. The icon became much more visible and easier to find for all users."
        impactDesc="Improved accessibility and usability for all users, especially those with low vision. UI elements are now more discoverable and compliant with accessibility standards."
        before={<BeforeAfterMockup type="modal-accessibility" show="before" />}
        after={<BeforeAfterMockup type="modal-accessibility" show="after" />}
      />
      {/* TODO: Add more CaseStudy components here */}
    </main>
  );
}
