import { Component, useEffect, useState } from 'react';

import {Header} from '../../components/Header';
import api from '../../services/api';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}



export function Dashboard() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  const [isFoods, setIsFoods] = useState<FoodProps[]>([])
  const [isEditingFood, setIsEditingFood] = useState<FoodProps>({} as FoodProps)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // async componentDidMount() {
  //   const response = await api.get('/foods');

  //   this.setState({ foods: response.data });
  // }

    useEffect( () => {
     api.get('/foods').then(response => {
      setIsFoods(response.data)
    })
  }, [])

  async function handleAddFood (food:FoodProps) {
    // const { foods } = this.state;

    try {
      await api.post('/foods', {
        ...food,
        available: true,
      }).then(response => {
        setIsFoods([...isFoods, response.data]);
      });

      
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood (food:FoodProps) {
    // const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${isEditingFood.id}`,
        { ...isEditingFood, ...food },
      );

      const foodsUpdated = isFoods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setIsFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood  (id:number)  {
    // const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = isFoods.filter(food => food.id !== id);

    setIsFoods( foodsFiltered);
  }

  function toggleModal (){
    // const { modalOpen } = this.state;
   setIsModalOpen(!isModalOpen);
  }

  function toggleEditModal () {
    // const { editModalOpen } = this.state;

    setIsEditModalOpen(!isEditModalOpen);
  }

  function handleEditFood  (food:FoodProps) {
    setIsEditingFood(food);
    setIsEditModalOpen(true)
  }

    // const { modalOpen, editModalOpen, editingFood, foods } = this.state;
    console.log(isEditModalOpen)
    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={isModalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        
        <ModalEditFood
          isOpen={isEditModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={isEditingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {isFoods &&
            isFoods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );

};


