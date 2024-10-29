// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Thank you very much. Life or work is just resilience. Rejecting
            those whom they provide, he flees from laborious pleasure.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
