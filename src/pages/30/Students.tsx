import  { useRef, useState } from 'react';
import { Table, Button, Space, Input, InputRef, Modal, Typography, Descriptions, List, Col, Row, Card, Avatar, Badge, Progress, Tag } from 'antd';
import type { FilterDropdownProps, ColumnType } from 'antd/es/table/interface';
import {
    MailOutlined,
    MessageOutlined,
    InfoCircleOutlined,
    SolutionOutlined,
    SearchOutlined,
    ExclamationCircleOutlined,
    SendOutlined,
    BankOutlined,
    EditOutlined,
    FilePdfOutlined,
    IdcardOutlined,
    PhoneOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "./Students.styles.css";
import { Course, Student } from '../../apiMAG/user';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/lib/skeleton/Title';
import { color } from 'echarts';
import { title } from 'process';

//$env:NODE_OPTIONS = "--openssl-legacy-provider"; yarn start
// Custom Course List Component
interface CourseListProps {
    title: string;
    courses: Course[];
    color: string;
}

const CourseList: React.FC<CourseListProps> = ({ title, courses, color }) => (
    <Card
        title={title}
        bordered={false}
        headStyle={{
            borderBottom: `2px solid ${color}`,
            padding: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: 500,
            paddingLeft:"9px"
        }}
    >
        <List
            dataSource={courses}
            renderItem={(course) => (
                <List.Item
                    style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s',
                        //':hover': {
                        //    background: '#f8fafc',
                        //    transform: 'translateX(4px)'
                        //}
                    }}
                >
                    <Typography.Text strong>{course.coursename}</Typography.Text>
                    <div style={{ marginLeft: 'auto', color: color }}>
                        {course.credits} credits
                    </div>
                </List.Item>
            )}
            bordered={false}
        />
    </Card>
);


export default function Students() {
    const { confirm } = Modal;
    const { Text } = Typography;
    const [isAdviseModalVisible, setAdviseModalVisible] = useState(false);
    const [adviseStudent, setAdviseStudent] = useState<Student | null>(null);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const getColumnSearchProps = (dataIndex: keyof Student): ColumnType<Student> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (//return custom JSX
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        setSearchText(selectedKeys[0] as string);
                        setSearchedColumn(dataIndex);
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm();
                            setSearchText(selectedKeys[0] as string);
                            setSearchedColumn(dataIndex);
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters?.();
                            setSearchText('');
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: Student) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toString().toLowerCase()),
        render: (text: string) =>// highlighting of matched text using react-highlight-words.


            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape//escape special characters (like . * + ? ( ) etc.) in the search term so that they are treated as plain text, not regex symbols.
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const dataSource: Student[] = [
        {
            userid: 1,
            fullname: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            image: 'https://example.com/images/alice.jpg',
            departmentid: 101,
            departmentname: 'Computer Science',
            campusname: 'North Campus',
           
            creditsFinished: 110,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'CS301', credits: 3 },
                { coursename: 'CS302', credits: 3 },
                { coursename: 'MATH210', credits: 4 }
            ],
            remainingCourses: [
                { coursename: 'CS401', credits: 3 },
                { coursename: 'CS402', credits: 3 },
                { coursename: 'CS403', credits: 3 }
            ],
        },
        {
            userid: 2,
            fullname: 'Brian Smith',
            email: 'brian.smith@example.com',
            image: 'https://example.com/images/brian.jpg',
            departmentid: 102,
            departmentname: 'Mathematics',
            campusname: 'East Campus',
           
            creditsFinished: 95,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'MATH310', credits: 4 },
                { coursename: 'STAT205', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'MATH410', credits: 4 },
                { coursename: 'MATH420', credits: 4 },
                { coursename: 'STAT305', credits: 3 }
            ],
        },
        {
            userid: 3,
            fullname: 'Carmen Lee',
            email: 'carmen.lee@example.com',
            image: 'https://example.com/images/carmen.jpg',
            departmentid: 103,
            departmentname: 'Physics',
            campusname: 'South Campus',
           
            creditsFinished: 102,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'PHYS301', credits: 4 },
                { coursename: 'PHYS302', credits: 4 }
            ],
            remainingCourses: [
                { coursename: 'PHYS401', credits: 4 },
                { coursename: 'PHYS402', credits: 4 },
                { coursename: 'MATH310', credits: 4 }
            ],
        },
        {
            userid: 4,
            fullname: 'Daniel Patel',
            email: 'daniel.patel@example.com',
            image: 'https://example.com/images/daniel.jpg',
            departmentid: 104,
            departmentname: 'Chemistry',
            campusname: 'West Campus',
          
            creditsFinished: 88,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'CHEM201', credits: 4 },
                { coursename: 'CHEM202', credits: 4 },
                { coursename: 'BIOL101', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'CHEM301', credits: 4 },
                { coursename: 'CHEM302', credits: 4 },
                { coursename: 'CHEM303', credits: 4 }
            ],
        },
        {
            userid: 5,
            fullname: 'Eva Chen',
            email: 'eva.chen@example.com',
            image: 'https://example.com/images/eva.jpg',
            departmentid: 105,
            departmentname: 'Biology',
            campusname: 'North Campus',
          
            creditsFinished: 100,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'BIOL201', credits: 3 },
                { coursename: 'BIOL202', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'BIOL301', credits: 3 },
                { coursename: 'BIOL302', credits: 3 },
                { coursename: 'CHEM201', credits: 4 }
            ],
        },
        {
            userid: 6,
            fullname: 'Frank Garcia',
            email: 'frank.garcia@example.com',
            image: 'https://example.com/images/frank.jpg',
            departmentid: 106,
            departmentname: 'Economics',
            campusname: 'East Campus',
          
            creditsFinished: 92,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'ECON201', credits: 3 },
                { coursename: 'ECON202', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'ECON301', credits: 3 },
                { coursename: 'ECON302', credits: 3 },
                { coursename: 'STAT205', credits: 3 }
            ],
        },
        {
            userid: 7,
            fullname: 'Grace Müller',
            email: 'grace.muller@example.com',
            image: 'https://example.com/images/grace.jpg',
            departmentid: 107,
            departmentname: 'History',
            campusname: 'South Campus',
           
            creditsFinished: 105,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'HIST301', credits: 3 },
                { coursename: 'HIST302', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'HIST401', credits: 3 },
                { coursename: 'PHIL101', credits: 3 },
                { coursename: 'SOC201', credits: 3 }
            ],
        },
        {
            userid: 8,
            fullname: 'Hiro Tanaka',
            email: 'hiro.tanaka@example.com',
            image: 'https://fbzizacbqkmfobmzospk.supabase.co/storage/v1/object/public/uploads/1747079167762_pfp.jpg.jpg',
            departmentid: 108,
            departmentname: 'Engineering',
            campusname: 'West Campus',
          
            creditsFinished: 108,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'ENGR301', credits: 4 },
                { coursename: 'ENGR302', credits: 4 },
                { coursename: 'MATH310', credits: 4 }
            ],
            remainingCourses: [
                { coursename: 'ENGR401', credits: 4 },
                { coursename: 'ENGR402', credits: 4 },
                { coursename: 'CS301', credits: 3 }
            ],
        },
        {
            userid: 9,
            fullname: 'Isabel Santos',
            email: 'isabel.santos@example.com',
            image: 'https://example.com/images/isabel.jpg',
            departmentid: 109,
            departmentname: 'Literature',
            campusname: 'North Campus',
          
            creditsFinished: 98,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'LIT201', credits: 3 },
                { coursename: 'LIT202', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'LIT301', credits: 3 },
                { coursename: 'LIT302', credits: 3 },
                { coursename: 'ENG101', credits: 3 }
            ],
        },
        {
            userid: 10,
            fullname: 'Jack O’Neill',
            email: 'jack.oneill@example.com',
            image: 'https://example.com/images/jack.jpg',
            departmentid: 110,
            departmentname: 'Philosophy',
            campusname: 'East Campus',
          
            creditsFinished: 90,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'PHIL201', credits: 3 },
                { coursename: 'PHIL202', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'PHIL301', credits: 3 },
                { coursename: 'PHIL302', credits: 3 },
                { coursename: 'HIST101', credits: 3 }
            ],
        },
        {
            userid: 11,
            fullname: 'Karim Hussein',
            email: 'karim.hussein@example.com',
            image: 'https://example.com/images/karim.jpg',
            departmentid: 111,
            departmentname: 'Political Science',
            campusname: 'South Campus',
           
            creditsFinished: 101,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'PS201', credits: 3 },
                { coursename: 'PS202', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'PS301', credits: 3 },
                { coursename: 'PS302', credits: 3 },
                { coursename: 'ECON201', credits: 3 }
            ],
        },
        {
            userid: 12,
            fullname: 'Luna Rossi',
            email: 'luna.rossi@example.com',
            image: 'https://example.com/images/luna.jpg',
            departmentid: 112,
            departmentname: 'Art',
            campusname: 'West Campus',
           
            creditsFinished: 115,
            totalCredits: 120,
            currentlyRegisteredCourses: [
                { coursename: 'ART301', credits: 3 },
                { coursename: 'ART302', credits: 3 }
            ],
            remainingCourses: [
                { coursename: 'ART401', credits: 3 },
                { coursename: 'ART402', credits: 3 },
                { coursename: 'HIST201', credits: 3 }
            ],
        }
    ];



    // --- Handler implementations ---
    const showAdviseModal = (student: Student) => {
        setAdviseStudent(student);
        setAdviseModalVisible(true);
    };
    const handleAdviseCancel = () => {
        setAdviseModalVisible(false);
        setAdviseStudent(null);
    };
    const handleSendPlan = (scope: 'single' | 'group') => {
        console.log(`Send advising plan to ${scope}`, adviseStudent);
        // implement actual send logic here...
        setAdviseModalVisible(false);
    };
    const handleEmail = (email?: string) => {
        if (!email) return;
        // Navigate browser to mailto link, opening default mail client
        //window.location.href = `mailto:${encodeURIComponent(email)}`;
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
        window.open(gmailComposeUrl, '_blank');
    };
    const handleChat = (studentId?: number) => {
        if (!studentId) return;
        confirm({
            title: 'Start Chat?',
            icon: <ExclamationCircleOutlined />,
            content: `Do you want to open the chat for student #${studentId}?`,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                navigate(`/Messager/${studentId}`);
            },
            onCancel() {
                // no-op
            },
        });
    };
   
    const handleAdvise = (student: number) => {
       
    };
    // -----------------------------------

    const columns: ColumnType<Student>[] = [
        {
            title: 'Student ID',
            dataIndex: 'userid',
            key: 'userid',
            ...getColumnSearchProps('userid'),
            sorter: (a: Student, b: Student) => a.userid - b.userid,
        },
        {
            title: 'Student Name',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
        },
        {
            title: 'Campus',
            dataIndex: 'campusname',
            key: 'campusname',
            filters: Array.from(new Set(dataSource.map(d => d.campusname))).map(c => ({ text: c, value: c })),
            onFilter: (value: any, record: Student) => record.campusname === value,
        },
        {
            title: 'Department',
            dataIndex: 'departmentname',
            key: 'departmentname',
            filters: Array.from(new Set(dataSource.map(d => d.departmentname))).map(dpt => ({ text: dpt, value: dpt })),
            onFilter: (value: any, record: Student) => record.departmentname === value,
        },
       
        {
            title: 'Finished Credits',
            dataIndex: 'creditsFinished',
            key: 'creditsFinished',
           
            sorter: (a: Student, b: Student) => a.creditsFinished - b.creditsFinished,
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center', // This centers both the header and cell content
            render: (_: any, record: Student) => (
                <Row justify="space-between" align="middle">
                    <Col>
                        <Space size="small">
                            <Button
                                type="link"
                                icon={<MailOutlined />}
                                onClick={() => handleEmail(record.email)}
                            >
                                Email
                            </Button>
                            <Button
                                type="link"
                                icon={<MessageOutlined />}
                                onClick={() => handleChat(record.userid)}
                            >
                                Chat
                            </Button>
                        </Space>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            icon={<SolutionOutlined />}
                            onClick={() => showAdviseModal(record)}
                        >
                            Advise
                        </Button>
                    </Col>
                </Row>
            ),
        }
    ];


    return (
        <>
            <Table
                pagination={{
                    pageSize: 8, // Number of entries per page
                    showSizeChanger: false, // Hide page size changer
                    // Other pagination options:
                    // position: ['bottomCenter'],
                    // hideOnSinglePage: true
                }}
                className="custom-table"
                rowKey="userid"
                dataSource={dataSource}
                columns={columns} />
            <Modal
                title={null}
                open={isAdviseModalVisible}
                onCancel={handleAdviseCancel}
                width="90vw"
                style={{ maxWidth: 1200 }}
                footer={null}
                centered
                destroyOnClose
                className="luxury-modal"
                bodyStyle={{
                    padding: 0,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
                }}
            >
                {adviseStudent && (
                    <div className="modal-container" style={{ borderRadius: '12px',} }>
                        {/* Profile Header with Image */}
                        <div className="profile-header" style={{
                            background: 'linear-gradient(135deg, #038b94 0%, #025e63 100%)',
                            padding: '32px 40px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            

                        }}>
                            <Badge
                                dot
                                color="#4cd964"
                                offset={[-20, 80]}
                                status="processing"
                            >
                                <Avatar
                                    src={adviseStudent.image || '/default-avatar.png'}
                                    size={120}
                                    style={{
                                        border: '3px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                    }}
                                />
                            </Badge>

                            <div>
                                <Typography.Title
                                    level={2}
                                    style={{
                                        color: 'white',
                                        margin: 0,
                                        fontWeight: 600,
                                        letterSpacing: '-0.5px'
                                    }}
                                >
                                    {adviseStudent.fullname}
                                </Typography.Title>
                                <Space size={16} style={{ marginTop: 8 }}>
                                    <Tag style={{
                                        background: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        padding: '4px 12px'
                                    }}>
                                        <IdcardOutlined /> id: {adviseStudent.userid}
                                    </Tag>
                                    <Tag style={{
                                        background: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        padding: '4px 12px'
                                    }}>
                                        <BankOutlined /> {adviseStudent.campusname}
                                    </Tag>
                                </Space>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div style={{ padding: '32px 40px', background: '#f8fafc', }}>
                            {/* Academic Overview */}
                            <Card
                                title="Academic Overview"
                                bordered={false}
                                headStyle={{
                                    borderBottom: '2px solid #038b94',
                                    padding: '0 0 16px 0',
                                    fontSize: '20px',
                                    fontWeight: 500
                                }}
                                style={{ marginBottom: 24 }}
                            >
                                <Descriptions column={2} size="middle">
                                    <Descriptions.Item label="Department" contentStyle={{ fontWeight: 500 }}>
                                        {adviseStudent.departmentname}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Current GPA" contentStyle={{ color: '#038b94', fontWeight: 600 }}>
                                        3.97
                                    </Descriptions.Item>
                                    <Descriptions.Item>
                                        <div style={{ width: '80%' }}>
                                            <Text style={{ display: 'block', marginBottom: 8 }}>
                                                Credits Progress:
                                            </Text>
                                            <Progress
                                                percent={Number(
                                                    (adviseStudent.creditsFinished / adviseStudent.totalCredits * 100).toFixed(0)
                                                )}
                                            
                                                strokeColor="#038b94"
                                                trailColor="#e6f4ff"
                                                strokeWidth={12}
                                                format={percent => `${adviseStudent.creditsFinished}/${adviseStudent.totalCredits}`}
                                            />
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Contact">
                                        <Space direction="vertical">
                                            <div>
                                                <MailOutlined /> {adviseStudent.email}
                                            </div>
                                         
                                        </Space>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            {/* Course Management */}
                            <Row gutter={32}>
                                <Col span={12}>
                                    <CourseList
                                        title="Current Courses"
                                        courses={adviseStudent.currentlyRegisteredCourses}
                                        color="#038b94"
                                    />
                                </Col>
                                <Col span={12}>
                                    <CourseList
                                        title="Remaining Requirements"
                                        courses={adviseStudent.remainingCourses}
                                        color="#ff6b6b"
                                    />
                                </Col>
                            </Row>

                            {/* Action Bar */}
                            <div style={{
                                marginTop: 40,
                                paddingTop: 24,
                                borderTop: '2px solid #eee',
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center'
                            }}>
                               

                                <Space>
                                    <Button
                                        icon={<SendOutlined />}
                                        type="primary"
                                        style={{
                                            background: '#038b94',
                                            padding: '8px 24px',
                                            height: 'auto',
                                            marginRight:"5px"
                                        }}
                                        onClick={() => handleSendPlan('single')}
                                    >
                                        Send Advising Plan
                                    </Button>
                                </Space>
                                <Space>
                                    <Button
                                        icon={<LoginOutlined />}
                                        type="primary"
                                        style={{
                                            background: '#038b94',
                                            padding: '8px 24px',
                                            height: 'auto'
                                        }}
                                        onClick={() => handleSendPlan('single')}
                                    >
                                        Access Profile
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>


            
        </>);
}