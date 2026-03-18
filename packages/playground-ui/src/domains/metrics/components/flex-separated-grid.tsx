import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/index';

export function FlexSeparatedGrid({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mutatingRef = useRef(false);

  const detectRows = useCallback(() => {
    const container = containerRef.current;
    if (!container || mutatingRef.current) return;
    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    // Strip layout-affecting attributes before measuring so positions
    // reflect the base layout and don't oscillate.
    for (const item of items) {
      item.removeAttribute('data-separator');
      item.removeAttribute('data-last-row');
    }

    // Force a synchronous reflow so getBoundingClientRect reads clean positions
    void container.offsetHeight;

    let lastTop = -Infinity;
    let lastRowStartIndex = 0;
    const separators: boolean[] = [];

    for (let i = 0; i < items.length; i++) {
      const top = items[i].getBoundingClientRect().top;
      if (top > lastTop + 1) {
        separators[i] = false;
        lastRowStartIndex = i;
        lastTop = top;
      } else {
        separators[i] = true;
      }
    }

    // Apply attributes — suppress ResizeObserver during mutations
    mutatingRef.current = true;

    for (let i = 0; i < items.length; i++) {
      if (separators[i]) {
        items[i].setAttribute('data-separator', '');
      }
      if (i >= lastRowStartIndex) {
        items[i].setAttribute('data-last-row', '');
      }
    }

    // Allow the browser to settle before re-enabling observation
    requestAnimationFrame(() => {
      mutatingRef.current = false;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    detectRows();

    const ro = new ResizeObserver(detectRows);
    ro.observe(container);
    return () => ro.disconnect();
  }, [detectRows, children]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-wrap gap-y-10 gap-x-12 [&>*]:flex-1',
        // Vertical separator between items on the same row (stops at content, not padding)
        '[&>[data-separator]]:pl-12',
        '[&>[data-separator]]:before:content-[""] [&>[data-separator]]:before:absolute [&>[data-separator]]:before:left-0 [&>[data-separator]]:before:top-0 [&>[data-separator]]:before:bottom-10 [&>[data-separator]]:before:w-[2px] [&>[data-separator]]:before:bg-surface5',
        // Last row separators: no bottom padding so line goes to bottom
        '[&>[data-last-row][data-separator]]:before:bottom-0',
        // Bottom border via ::after — all children except last row
        '[&>*]:relative [&>*]:pb-10',
        '[&>*]:after:content-[""] [&>*]:after:absolute [&>*]:after:bottom-0 [&>*]:after:left-0 [&>*]:after:right-0 [&>*]:after:h-[2px] [&>*]:after:bg-surface5',
        // Separator items: offset the bottom line past the left padding
        '[&>[data-separator]]:after:left-12',
        // Last row: no bottom border or padding
        '[&>[data-last-row]]:pb-0 [&>[data-last-row]]:after:hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}
