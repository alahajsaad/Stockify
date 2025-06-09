import StockSummaryCards from "../components/StockSummaryCards";
import AlertsSection from "./components/AlertsSection";
import QuickActions from "./components/QuickActions";

const AdminDash : React.FC = () => {
    return (
       <div>
        <StockSummaryCards />
        <div className="flex gap-6 items-center justify-center">
        <AlertsSection />
        <QuickActions />
        </div>
       
       </div>
    );
}
export default AdminDash ;