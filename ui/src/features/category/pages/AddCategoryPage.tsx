import CategoryForm from "../forms/CategoryForm";

const AddCategoryPage : React.FC = () => {
    return (
        <div className="card max-w-150 ">
        <p className="text-2xl pb-4">Ajouter une nouvelle catégorie</p>
          <CategoryForm />
        </div>
    );
}
export default AddCategoryPage ;