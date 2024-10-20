// import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  // return (
  //   <div>
  //     <Button type="button" onClick={() => setisOpenModel((show) => !show)}>
  //       Show form
  //     </Button>
  //     {isOpenModel && (
  //       <Modal onCloseModal={() => setisOpenModel(!isOpenModel)} />
  //     )}
  //   </div>
  // );
}

export default AddCabin;
