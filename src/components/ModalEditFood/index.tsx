import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import {Input} from '../Input';

interface ModalAddFoodProps {
  isOpen: boolean,
  setIsOpen: () => void,
  handleUpdateFood: (data:any) => void,
  editingFood: {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
  }
}

export function ModalEditFood({isOpen, setIsOpen, handleUpdateFood, editingFood}:ModalAddFoodProps) {
  // constructor(props) {
  //   super(props);

  //   this.formRef = createRef()
  // }
  async function handleSubmit  (data:Promise<string>)  {
    // const { setIsOpen, handleAddFood } = props;

    handleUpdateFood(data);
    setIsOpen();
  };

    // const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={createRef()} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};
