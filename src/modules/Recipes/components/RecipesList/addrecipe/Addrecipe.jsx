import React, { useEffect, useState } from 'react'
import StyleAddrecipe from "./addrecipe.module.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { BASEDTAGID, CATEGORY, RECIPE } from '../../../../Constants/ENDPOINT'
import { toast } from 'react-toastify';
// import Blocker from '../../../../Shared/unblocker/Blocker'
import BeforUnReload from '../../../../Shared/costum-hock/BeforUnReload'
// import DragImage from '../../../../Shared/components/DragdropImg/DragImage'

export default function Addrecipe() {

  const location = useLocation()
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm()

  const [Tagid, setTagid] = useState([])
  const [SelctTag, setSelectTagid] = useState()
  const [SelectCat, setSlectCat] = useState([])
  const navigate = useNavigate()
  const ToRecipse = () => {
    navigate("/dashboard/recipes")
  }

  const state = location.state?.type === "Edit"
  const recipeData = location.state?.getrecipeid
  console.log(location)


  //  get Tag id and Usestate

  const GetTagId = async () => {
    try {
      let response = await axios.get(BASEDTAGID, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },


      })
      // toast.success("Login successfuliy")
      setTagid(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
      // toast.error(error.Response.data.message)

    }
  }



  //  get categoryId id and Usestate

  const [Categ, setCateg] = useState([])

  const isDataCategory = async () => {
    try {
      let response = await axios.get(CATEGORY.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })

      setCateg(response.data.data)

      // console.log(response.data.data)
    }
    catch (error) {
      console.log(error)

    }

  }

  const appendtodata = (data) => {
    const dataForm = new FormData();

    // dataForm.append('name', getValues('name'))
    // dataForm.append('price', getValues('price'))
    // dataForm.append('description', getValues('description'))
    // dataForm.append('tagId', getValues('tagId'))
    // dataForm.append('categoriesIds', getValues('categoriesIds'))
    // dataForm.append('recipeImage', getValues('recipeImage'))
    // dataForm.append('recipeImage', getValues('recipeImage')[0])
    // dataForm.append('profileImage',getValues('imagePath'))

    dataForm.append("name", data.name);
    dataForm.append("price", data.price);
    dataForm.append("description", data.description);
    dataForm.append("tagId", data.tagId);
    dataForm.append("categoriesIds", data.categoriesIds);
    dataForm.append("recipeImage", data?.recipeImage?.[0]);

    return dataForm;
  }

  const onSubmit = async (data) => {
    let recipesData = appendtodata(data)
    // console.log(data)
    try {
      let response = await axios(
        {
          method: state ? "put" : "post",
          url: state ? `${RECIPE.put(recipeData.id)}` : RECIPE.post,
          data: recipesData,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )

      // let response = await axios.post(RECIPE.post, recipesData, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },


      // })
      // toast.success(response.data.message)
      navigate("/dashboard/recipes")

      console.log(response)
    }
    catch (error) {
      console.log(error)
      // toast.error(error.Response.data.message)

    }
  }



  useEffect(() => {
    const getdatafromlocal = async () => {
      await GetTagId()
      await isDataCategory()
      let stordata = JSON.parse(localStorage.getItem("recipe-data"))
      reset(stordata)
    }

    if (state && recipeData) {
      setSelectTagid(recipeData?.tag.id)
      setSlectCat(recipeData?.category[0].id)
    }
    console.log({ SelctTag, SelectCat })
    console.log(recipeData)

    getdatafromlocal()

  }, [])



  const handelreload = React.useCallback((e) => {
    // console.log("helllo")
    e.preventDefault()
    localStorage.setItem("recipe-data", JSON.stringify(getValues()))
  }, [])
  BeforUnReload(handelreload)

  return (
    <>
      {/* <Blocker GetValues={getValues} /> */}
      <div className={StyleAddrecipe.SectionFotter}>
        <div className={StyleAddrecipe.TitleSec}>
          <h1>Fill the <span>Recipes</span> !</h1>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className={StyleAddrecipe.BtnSec}>
          <Button onClick={ToRecipse}>All Recipes<box-icon name='right-arrow-alt' color="white"></box-icon></Button>
        </div>

      </div>
      <div >
        <form onSubmit={handleSubmit(onSubmit)} className={StyleAddrecipe.ContanerForm}>

          <input type="text" aria-label='name' placeholder='Recipe Name'
            {...register("name", { required: "name is require" })}
            defaultValue={state ? recipeData?.name : ""}

          />
          {errors.name ? <p className={` ${StyleAddrecipe.error}  `}>{errors.name.message}</p> : ""}



          <select {...register("tagId", { required: "tagid is require" })}
            value={SelctTag}
            onChange={(e) => setSelectTagid(e.target.value)}
          >
            <option disabled="select tag.."></option>
            {Tagid?.map((tag) =>
              <option key={tag.id} value={tag.id}>{tag.name}</option>

            )}


          </select>
          {errors.tagId ? <p className={` ${StyleAddrecipe.error}  `}>{errors.tagId.message}</p> : ""}

          <input type="number" aria-label='price' placeholder='Price'
            {...register("price", {
              required: "price is reqiuerd"
            })
            }
            defaultValue={state ? recipeData?.price : ""}
          />
          {errors.price ? <p className={` ${StyleAddrecipe.error}  `}>{errors.price.message}</p> : ""}


          <select className={StyleAddrecipe.categoriesIds}{...register("categoriesIds")}
            value={SelectCat}
            onChange={(e) => setSlectCat(e.target.value)}
          >
            <option disabled="select category..."></option>
            {Categ?.map((Cat) =>
              <option key={Cat.id} value={Cat.id}>{Cat.name}</option>

            )}
          </select>
          {errors.categoriesIds ? <p className={` ${StyleAddrecipe.error}  `}>{errors.categoriesIds.message}</p> : ""}


          <textarea placeholder='description *'
            {...register("description", { required: "description" })}
            defaultValue={state ? recipeData?.description : ""}
          ></textarea>
          {errors.description ? <p className={` ${StyleAddrecipe.error}  `}>{errors.description.message}</p> : ""}

          {/* <DragImage {...register("recipeImage")} /> */}

          <input type="file"{...register("recipeImage")}/>

          <div className={StyleAddrecipe.Bttn}>
            <Button type='button' onClick={ToRecipse}> Cancel</Button>

            <Button type='submit' className='bg-success py-2 px-2'>Save Recipe</Button>
          </div>
        </form>

      </div>


    </>

  )
}
