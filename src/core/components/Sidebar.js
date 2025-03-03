import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPen, FaBox, FaGraduationCap, FaPalette, FaTag, FaSteam, FaBook, FaFileAlt, FaChevronRight } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 20px 0;
  height: 100%;
  position: relative;
`;

const CategoryTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  padding: 0 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 2px;
  position: relative;
`;

const CategoryLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: #555;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
  
  &.active {
    background-color: #e6f0ff;
    color: #0066cc;
    border-left: 3px solid #0066cc;
  }
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const SectionTitle = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #999;
  padding: 0 20px;
  margin: 30px 0 10px;
  letter-spacing: 1px;
`;

const SubMenu = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  width: 250px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 0;
  z-index: 100;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const SubMenuItem = styled.div`
  padding: 8px 20px;
  color: #555;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
`;

const SubMenuTitle = styled.div`
  font-weight: 600;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
`;

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      id: 1,
      title: 'Bút viết',
      icon: <FaPen />,
      path: '/products/stationery',
      subItems: [
        'Bút bi, bút mực, bút chì',
        'Bút dạ quang, bút lông dầu',
        'Bút gel, bút máy, bút dạ bảng',
        'Bút xoá, bút thử điện'
      ]
    },
    {
      id: 2,
      title: 'Văn phòng phẩm',
      icon: <FaBox />,
      path: '/products/office-supplies',
      subItems: [
        'Kẹp giấy, kẹp bướm, gim bấm',
        'Băng keo, hồ dán, kéo',
        'Tập vở, sổ ghi chép, sổ tay',
        'Bìa hồ sơ, bìa nhựa, file đựng giấy',
        'Máy dập ghim, bấm lỗ, dao rọc giấy'
      ]
    },
    {
      id: 3,
      title: 'Dụng Cụ Học Tập',
      icon: <FaGraduationCap />,
      path: '/products/school-supplies',
      subItems: [
        'Thước kẻ, ê ke, compa',
        'Bảng vẽ, bảng con, phấn viết',
        'Cặp sách, balo, hộp bút',
        'Tẩy, chuốt bút chì'
      ]
    },
    {
      id: 4,
      title: 'Mỹ Thuật',
      icon: <FaPalette />,
      path: '/products/art',
      subItems: [
        'Màu nước, màu sáp, màu acrylic',
        'Bút lông vẽ, cọ vẽ, bảng pha màu',
        'Đất nặn, giấy mỹ thuật, giấy màu',
        'Canvas vẽ tranh, giá vẽ'
      ]
    },
    {
      id: 5,
      title: 'Giấy In',
      icon: <FaFileAlt />,
      path: '/products/paper',
      subItems: [
        'Giấy A4, A3, A5',
        'Giấy decal, giấy ảnh, giấy than',
        'Giấy in nhiệt, giấy in hóa đơn'
      ]
    },
    {
      id: 6,
      title: 'Bút cao cấp',
      icon: <FaTag />,
      path: '/products/premium',
      subItems: [
        'Bút máy cao cấp, bút ký tên',
        'Bút bi thương hiệu, bút quà tặng',
        'Bút khắc tên, bút làm quà tặng doanh nghiệp'
      ]
    },
    {
      id: 7,
      title: 'STEAM & DIY',
      icon: <FaSteam />,
      path: '/products/steam',
      subItems: [
        'Bộ lắp ráp mô hình',
        'Đồ chơi khoa học, STEM',
        'Robot lập trình, kit Arduino, Raspberry Pi',
        'Dụng cụ DIY, keo nến, máy cắt laser mini'
      ]
    },
    {
      id: 8,
      title: 'Sách',
      icon: <FaBook />,
      path: '/products/books',
      subItems: [
        'Sách giáo khoa, sách tham khảo',
        'Truyện tranh, tiểu thuyết, sách kỹ năng',
        'Sách học ngoại ngữ, từ điển',
        'Sách tô màu, sách vẽ tranh'
      ]
    }
  ];

  const handleMouseEnter = (id) => {
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <SidebarContainer>
      <CategoryTitle>Danh Sách Sản Phẩm</CategoryTitle>
      
      <CategoryList>
        {menuItems.map((item) => (
          <CategoryItem 
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <CategoryLink>
              <LinkContent>
                <Icon>{item.icon}</Icon>
                {item.title}
              </LinkContent>
              <FaChevronRight size={12} />
            </CategoryLink>
            
            <SubMenu isOpen={activeMenu === item.id}>
              <SubMenuTitle>{item.title}</SubMenuTitle>
              {item.subItems.map((subItem, index) => (
                <Link to={`${item.path}/${index + 1}`} key={index}>
                  <SubMenuItem>{subItem}</SubMenuItem>
                </Link>
              ))}
            </SubMenu>
          </CategoryItem>
        ))}
      </CategoryList>
      
      <SectionTitle>Danh mục nổi bật</SectionTitle>
      <CategoryList>
        <CategoryItem>
          <CategoryLink as={Link} to="/products/featured">
            <LinkContent>Khách hàng thân thiết</LinkContent>
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink as={Link} to="/products/priority">
            <LinkContent>Khách hàng ưu tiên</LinkContent>
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink as={Link} to="/products/business">
            <LinkContent>Thiên Long Nội Bộ</LinkContent>
          </CategoryLink>
        </CategoryItem>
      </CategoryList>
    </SidebarContainer>
  );
};

export default Sidebar;
