export const getFocusableElements = (container: Element | null) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLInputElement>(
      'input, button, select, textarea, [tabindex="0"]',
    ),
  );
};
