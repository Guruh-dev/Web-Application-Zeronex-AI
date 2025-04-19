import { 
    users, type User, type InsertUser,
    caseStudies, type CaseStudy, type InsertCaseStudy,
    generations, type Generation, type InsertGeneration
  } from "@shared/schema";
  
  // CRUD interface for all entities
  export interface IStorage {
    // User operations
    getUser(id: number): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;
    
    // Case Study operations
    getCaseStudies(): Promise<CaseStudy[]>;
    getCaseStudyById(id: number): Promise<CaseStudy | undefined>;
    getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
    createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
    updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined>;
    deleteCaseStudy(id: number): Promise<boolean>;
    
    // Generation operations
    getGenerations(userId: number): Promise<Generation[]>;
    getGenerationById(id: number): Promise<Generation | undefined>;
    createGeneration(generation: InsertGeneration): Promise<Generation>;
  }
  
  // In-memory storage implementation
  export class MemStorage implements IStorage {
    private users: Map<number, User>;
    private caseStudies: Map<number, CaseStudy>;
    private generations: Map<number, Generation>;
    private userId: number;
    private caseStudyId: number;
    private generationId: number;
  
    constructor() {
      this.users = new Map();
      this.caseStudies = new Map();
      this.generations = new Map();
      this.userId = 1;
      this.caseStudyId = 1;
      this.generationId = 1;
      
      // Initialize with some sample case studies
      this.initializeData();
    }
    
    private initializeData() {
      // Add sample case studies
      const sampleCaseStudies: InsertCaseStudy[] = [
        {
          title: "AI-Powered Smart Shopping Assistant",
          slug: "ai-powered-smart-shopping-assistant",
          summary: "Developed an AI shopping assistant that provides personalized product recommendations and shopping insights.",
          content: `
            # Project Overview
            We created an intelligent shopping assistant that leverages machine learning to analyze user preferences and provide tailored product recommendations. The application optimizes the shopping experience by understanding user habits and preferences over time.
            
            ## Challenges
            - Building a recommendation system that works with limited initial user data
            - Creating a responsive and intuitive interface for mobile users
            - Ensuring data privacy while collecting sufficient information for personalization
            
            ## Solution
            Our team implemented a hybrid recommendation system combining collaborative filtering and content-based approaches. We designed a mobile-first interface that presents recommendations in an intuitive card-based layout. User data is processed locally when possible, with robust encryption for any data transmitted to our servers.
            
            ## Results
            The assistant increased conversion rates by 28% and improved customer satisfaction scores by 35%. The average time spent shopping decreased while the average order value increased by 15%.
          `,
          imageUrl: "/case-studies/ai-shopping-assistant.svg",
          status: "published",
          category: "E-commerce",
          clientName: "GlobalShop Inc.",
          technologies: ["React Native", "TensorFlow", "Node.js", "GraphQL"],
        },
        {
          title: "Generative Design System for Architecture",
          slug: "generative-design-system-architecture",
          summary: "Created a generative AI system that helps architects explore design possibilities based on constraints and requirements.",
          content: `
            # Project Overview
            Our team developed a generative design system that assists architects in exploring innovative design solutions while meeting specific requirements and constraints. The system uses AI to generate multiple viable design options based on parameters such as space requirements, building codes, and aesthetic preferences.
            
            ## Challenges
            - Translating architectural constraints into machine-readable parameters
            - Generating designs that are both creative and practical
            - Creating an interface that architects find intuitive and valuable
            
            ## Solution
            We built a parameter-based design generation system using deep learning models trained on thousands of architectural designs. The interface allows architects to specify constraints through both visual inputs and numerical parameters. The system provides real-time feedback on the feasibility of generated designs.
            
            ## Results
            The system reduced initial design exploration time by 60% while increasing the number of viable concepts considered by architects. Client feedback indicates that the tool has helped discover unexpected design solutions that would likely have been overlooked using traditional methods.
          `,
          imageUrl: "/case-studies/architecture-ai.svg",
          status: "published",
          category: "Architecture",
          clientName: "UrbanSpace Architects",
          technologies: ["Python", "TensorFlow", "Three.js", "WebGL"],
        },
        {
          title: "Predictive Maintenance AI for Manufacturing",
          slug: "predictive-maintenance-ai-manufacturing",
          summary: "Implemented an AI system that predicts equipment failures before they occur, reducing downtime and maintenance costs.",
          content: `
            # Project Overview
            We developed a predictive maintenance system that uses machine learning to analyze sensor data from manufacturing equipment and predict potential failures before they occur. This allows maintenance teams to address issues proactively rather than reactively.
            
            ## Challenges
            - Integrating with diverse legacy equipment sensors
            - Building models that could predict failures with minimal false positives
            - Creating actionable alerts with clear maintenance recommendations
            
            ## Solution
            Our system collects data from various sensors through custom IoT bridges for legacy equipment. We implemented a multi-model approach that combines anomaly detection with specific failure prediction models. The system provides maintenance teams with detailed recommendations and estimated time-to-failure metrics.
            
            ## Results
            After implementation, the client experienced a 45% reduction in unplanned downtime and a 30% reduction in maintenance costs. The system achieved a failure prediction accuracy of 92% with a false positive rate below 5%.
          `,
          imageUrl: "/case-studies/predictive-maintenance.svg",
          status: "published",
          category: "Manufacturing",
          clientName: "TechManufacturing Ltd.",
          technologies: ["Python", "TensorFlow", "IoT", "Time Series Analysis"],
        }
      ];
      
      sampleCaseStudies.forEach(study => {
        const id = this.caseStudyId++;
        this.caseStudies.set(id, { ...study, id });
      });
    }
  
    // User operations
    async getUser(id: number): Promise<User | undefined> {
      return this.users.get(id);
    }
  
    async getUserByUsername(username: string): Promise<User | undefined> {
      return Array.from(this.users.values()).find(
        (user) => user.username === username
      );
    }
    
    async getUserByEmail(email: string): Promise<User | undefined> {
      return Array.from(this.users.values()).find(
        (user) => user.email === email
      );
    }
  
    async createUser(insertUser: InsertUser): Promise<User> {
      const id = this.userId++;
      const user: User = { ...insertUser, id };
      this.users.set(id, user);
      return user;
    }
    
    // Case Study operations
    async getCaseStudies(): Promise<CaseStudy[]> {
      return Array.from(this.caseStudies.values());
    }
    
    async getCaseStudyById(id: number): Promise<CaseStudy | undefined> {
      return this.caseStudies.get(id);
    }
    
    async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
      return Array.from(this.caseStudies.values()).find(
        (study) => study.slug === slug
      );
    }
    
    async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
      const id = this.caseStudyId++;
      const newCaseStudy: CaseStudy = { ...caseStudy, id };
      this.caseStudies.set(id, newCaseStudy);
      return newCaseStudy;
    }
    
    async updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined> {
      const existingCaseStudy = this.caseStudies.get(id);
      if (!existingCaseStudy) return undefined;
      
      const updatedCaseStudy = { ...existingCaseStudy, ...caseStudy };
      this.caseStudies.set(id, updatedCaseStudy);
      return updatedCaseStudy;
    }
    
    async deleteCaseStudy(id: number): Promise<boolean> {
      return this.caseStudies.delete(id);
    }
    
    // Generation operations
    async getGenerations(userId: number): Promise<Generation[]> {
      return Array.from(this.generations.values()).filter(
        (gen) => gen.userId === userId
      );
    }
    
    async getGenerationById(id: number): Promise<Generation | undefined> {
      return this.generations.get(id);
    }
    
    async createGeneration(generation: InsertGeneration): Promise<Generation> {
      const id = this.generationId++;
      const newGeneration: Generation = { 
        ...generation, 
        id, 
        createdAt: new Date()
      };
      this.generations.set(id, newGeneration);
      return newGeneration;
    }
  }
  
  export const storage = new MemStorage();
  