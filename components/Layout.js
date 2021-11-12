import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div className="px-20 h-screen">
      <Navbar username={props.username} />
      {props.children}
      <Footer />
    </div>
  );
}
