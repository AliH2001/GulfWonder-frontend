const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/places`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (placeFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (placeId, placeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deletePlace = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Reviews
const createReview = async (placeId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (placeId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deletePlace,
  createReview,
  deleteReview
};