// The Wix footer is an empty green band. Contact Us hides it on phones.
export function Footer({ desktopOnly = false }: { desktopOnly?: boolean }) {
  return <footer className={desktopOnly ? 'ftr d-only' : 'ftr'} />
}
