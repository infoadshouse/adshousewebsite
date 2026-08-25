import { ReviewsList } from "@/components/dashboard/ReviewsList";
import { requireUser } from "@/lib/auth";

export default async function ReviewsPage() {
  await requireUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Reviews</h1>
      <ReviewsList />
    </div>
  );
}
