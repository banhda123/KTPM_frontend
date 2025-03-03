import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #0066cc;
  }
`;

const FooterLink = styled(Link)`
  color: #ccc;
  margin-bottom: 10px;
  transition: color 0.3s;
  
  &:hover {
    color: #0066cc;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #ccc;
`;

const ContactIcon = styled.span`
  margin-right: 10px;
  color: #0066cc;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  color: #fff;
  background-color: #444;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background-color: #0066cc;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-top: 40px;
  border-top: 1px solid #444;
  color: #999;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Về Chúng Tôi</FooterTitle>
          <p style={{ color: '#ccc', marginBottom: '15px' }}>
            Chúng tôi cung cấp các sản phẩm văn phòng phẩm chất lượng cao với giá cả hợp lý.
          </p>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Danh Mục</FooterTitle>
          <FooterLink to="/products/stationery">Văn phòng phẩm</FooterLink>
          <FooterLink to="/products/art">Mỹ thuật</FooterLink>
          <FooterLink to="/products/school">Dụng cụ học tập</FooterLink>
          <FooterLink to="/products/office">Thiết bị văn phòng</FooterLink>
          <FooterLink to="/products/gifts">Quà tặng</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Thông Tin</FooterTitle>
          <FooterLink to="/about">Giới thiệu</FooterLink>
          <FooterLink to="/delivery">Chính sách vận chuyển</FooterLink>
          <FooterLink to="/privacy">Chính sách bảo mật</FooterLink>
          <FooterLink to="/terms">Điều khoản sử dụng</FooterLink>
          <FooterLink to="/faq">Câu hỏi thường gặp</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Liên Hệ</FooterTitle>
          <ContactItem>
            <ContactIcon><FaMapMarkerAlt /></ContactIcon>
            123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
          </ContactItem>
          <ContactItem>
            <ContactIcon><FaPhone /></ContactIcon>
            1900 866 819
          </ContactItem>
          <ContactItem>
            <ContactIcon><FaEnvelope /></ContactIcon>
            info@domart.vn
          </ContactItem>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} DoMart. Tất cả quyền được bảo lưu.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
