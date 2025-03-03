import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  margin: 30px 0;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const TabItem = styled.button`
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#0066cc' : 'transparent'};
  color: ${props => props.active ? '#0066cc' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #0066cc;
  }
`;

const TabContent = styled.div`
  padding: 10px 0;
  line-height: 1.6;
`;

const Tabs = ({ tabs, activeTab, onTabChange, content }) => {
  return (
    <TabsContainer>
      <TabList>
        {tabs.map(tab => (
          <TabItem
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabList>
      
      <TabContent>
        {content}
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;
