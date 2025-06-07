import { Requests } from "./api";

const messAround = async () => {
  // Write your test code in this function

  //test api calls here

  //create

  await Requests.postDog({
    name: "Moglee",
    image: "assets/corgi.png",
    description: "Me if i was a dog",
    isFavorite: false,
  });

  //favorite
  await Requests.updateDog(20, true);

  //getAll
  const dogs = await Requests.getAllDogs();
  console.log(dogs);

  //delete
  await Requests.deleteDog(20);

  await Requests.dummyFunction();
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
