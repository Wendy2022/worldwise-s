import styles from "./Product.module.css";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Worldwise is a website that records your travel history. You can
            easily check your travel tracks and record your travel experiences.
          </p>
          <p>Record every wonderful moment and keep beautiful memories.</p>
        </div>
      </section>
    </main>
  );
}
