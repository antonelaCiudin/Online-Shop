const Aside = {
  render: async () => {
    return `
   <div class="aside-header">
    <div>SHOP BY CATEGORY</div>
    <button class="aside-close-button" id="aside-close-button">x</button>
  </div>
  <div class="aside-body">
    <ul class="categories">
      <li>
        <a href="/#/dress"
          >Dresses
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
      <li>
        <a href="/#/skirt">Skirts
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li> 
      <li>
        <a href="/#/tshort">T-Shorts
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
      <li>
        <a href="/#/huddy">Huddy
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
      <li>
        <a href="/#/pant">Pants
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
    </ul>
  </div>`;
  },
  after_render: async () => {
    document.getElementById('aside-container').classList.remove('open');
    document
      .getElementById('aside-close-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.remove('open');
      });
  },
};

export default Aside;