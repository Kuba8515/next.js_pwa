export default function Footer() {
  return (
    <footer>
      Copyright{' '}
      <span>
        &copy; <code>Next PWA</code> Workout App
      </span>{' '}
      {new Date().getFullYear()}
    </footer>
  );
}
