package com.ran.trello.Model;

import com.ran.trello.Model.Entity.*;
import com.ran.trello.Model.Repository.ProjectRepository;
import com.ran.trello.Model.Repository.TaskCardRepository;
import com.ran.trello.Model.Repository.UserPRepository;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.Date;

public class CreateData {

        public void initData(ApplicationContext context) {
                UserPRepository userRepository = context.getBean(UserPRepository.class);
                ProjectRepository projectRepository = context.getBean(ProjectRepository.class);
                WrapperRepository wrapperRepository = context.getBean(WrapperRepository.class);
                TaskCardRepository taskCardRepository = context.getBean(TaskCardRepository.class);
                UserP u1 = new UserP("JeanValJean@gmail.com",
                                "$2a$10$kfitBkbrOnmtDEoiYthDxOtdZ4LU/oAM9ZZe3Ul3bERcPkHtT8ZTO", "Jean", "ValJean",
                                new ArrayList<Project>(), "icone-admin6.svg");
                UserP u2 = new UserP("BillyBob@gmail.com",
                                "$2a$10$PGv61eS8L6US3nChav/YjOWuuQEZvBWb2j6aWulwDzd1oVAoCKzVq", "Billy", "Bob",
                                new ArrayList<Project>(), "icone-admin2.svg");
                UserP u3 = new UserP("BobbyLarnak@gmail.com",
                                "$2a$10$9A0Zevq15btphGS4MYcX0uwuUD/uLw2B5YPSiQKBeFlQiRXyKqihG", "Bobby", "larnak",
                                new ArrayList<Project>(), "icone-admin3.svg");
                UserP u4 = new UserP("JohnnyLembrouille@gmail.com",
                                "$2a$10$vjmZ/ljcSG.6gz/u4FXdNOC3nujhhCataT8g1Dzr/hV8svSUQtUSW", "Johnny", "lembrouille",
                                new ArrayList<Project>(), "icone-admin4.svg");
                UserP u5 = new UserP("admin@mail.com", "$2a$10$HAutSR2yVEP9ZrMINr9hQu/ky2JwbL2/gDplfh5P6MmrxukLWdh2O",
                                "admin", "admin", new ArrayList<Project>(), "icone-admin5.svg");

                userRepository.save(u1);
                userRepository.save(u2);
                userRepository.save(u3);
                userRepository.save(u4);
                userRepository.save(u5);
                System.out.println("utilisateur crées");
                Project p1 = new Project("TrelloBis", "description de TrelloBis",
                                "https://cdn.pixabay.com/photo/2024/02/21/08/06/coast-8587004_1280.jpg",
                                new ArrayList<Wrapper>(), new ArrayList<UserP>());
                p1.addUser(u1);
                p1.addUser(u2);
                p1.addUser(u5);

                Project p2 = new Project("TaskManager", "description de TaskManager",
                                "https://cdn.pixabay.com/photo/2020/08/31/09/33/beach-5531919_1280.jpg",
                                new ArrayList<Wrapper>(), new ArrayList<UserP>());
                p2.addUser(u1);
                p2.addUser(u4);
                Project p3 = new Project("Trollolo", "description de Trollolo",
                                "https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_1280.jpg",
                                new ArrayList<Wrapper>(), new ArrayList<UserP>());
                p3.addUser(u1);
                p3.addUser(u2);
                p3.addUser(u3);
                p3.addUser(u4);
                p3.addUser(u5);

                projectRepository.save(p1);
                projectRepository.save(p2);
                projectRepository.save(p3);
                System.out.println("project crées");
                Wrapper w1 = new Wrapper("A faire", 0, new ArrayList<TaskCard>(), p1.getId());
                p1.addWrapper(w1);
                Wrapper w2 = new Wrapper("A faire...", 1, new ArrayList<TaskCard>(), p2.getId());
                p2.addWrapper(w2);
                Wrapper w3 = new Wrapper("A faire pour le projet Trollolo", 2, new ArrayList<TaskCard>(), p3.getId());
                p3.addWrapper(w3);
                Wrapper w4 = new Wrapper("En cours", 3, new ArrayList<TaskCard>(), p1.getId());
                p1.addWrapper(w4);
                Wrapper w5 = new Wrapper("En cours pour le projet TaskManager", 3, new ArrayList<TaskCard>(),
                                p2.getId());
                p2.addWrapper(w5);
                Wrapper w6 = new Wrapper("En cours pour le projet Trollolo", 4, new ArrayList<TaskCard>(), p3.getId());
                p3.addWrapper(w6);
                Wrapper w7 = new Wrapper("Terminé", 5, new ArrayList<TaskCard>(), p1.getId());
                p1.addWrapper(w7);
                wrapperRepository.save(w1);
                wrapperRepository.save(w2);
                wrapperRepository.save(w3);
                wrapperRepository.save(w4);
                wrapperRepository.save(w5);
                wrapperRepository.save(w6);
                wrapperRepository.save(w7);
                System.out.println("wrapper crées");
                TaskCard t1 = new TaskCard("Ajouter une fonction create()", "la fonction create() n'existe pas", 0,
                                w1.getId(), PriorityStatus.LOW.getStatus(), new Date(124, 1, 24));
                w1.addCard(t1);
                taskCardRepository.save(t1);
                TaskCard t2 = new TaskCard("login", "Faire un syteme de login", 1, w2.getId(),
                        PriorityStatus.LOW.getStatus(), new Date(124, 4, 25));
                w2.addCard(t2);
                taskCardRepository.save(t2);
                TaskCard t3 = new TaskCard("update", "Faire une fonction update", 2, w3.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w3.addCard(t3);
                taskCardRepository.save(t3);
                TaskCard t4 = new TaskCard("delete", "Faire une fonction delete", 3, w4.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w4.addCard(t4);
                taskCardRepository.save(t4);
                TaskCard t5 = new TaskCard("add", "Faire une fonction add", 3, w5.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w5.addCard(t5);
                taskCardRepository.save(t5);
                TaskCard t6 = new TaskCard("read", "Faire une fonction read", 4, w6.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w6.addCard(t6);
                taskCardRepository.save(t6);
                TaskCard t7 = new TaskCard("get", "Faire une fonction get", 5, w7.getId(), PriorityStatus.LOW.getStatus(), new Date());
                w7.addCard(t7);
                taskCardRepository.save(t7);
                TaskCard t8 = new TaskCard("add", "Faire une fonction add", 0, w1.getId(), PriorityStatus.LOW.getStatus(), new Date());
                w1.addCard(t8);
                taskCardRepository.save(t8);
                TaskCard t9 = new TaskCard("get", "Faire une fonction get", 1, w2.getId(), PriorityStatus.LOW.getStatus(), new Date());
                w2.addCard(t9);
                taskCardRepository.save(t9);
                TaskCard t10 = new TaskCard("delete", "Faire une fonction delete", 2, w3.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w3.addCard(t10);
                taskCardRepository.save(t10);
                TaskCard t11 = new TaskCard("update", "Faire une fonction update", 3, w4.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w4.addCard(t11);
                taskCardRepository.save(t11);
                TaskCard t12 = new TaskCard("delete", "Faire une fonction delete", 3, w5.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w5.addCard(t12);
                taskCardRepository.save(t12);
                TaskCard t13 = new TaskCard("read", "Faire une fonction read", 4, w6.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w6.addCard(t13);
                taskCardRepository.save(t13);
                TaskCard t14 = new TaskCard("update", "Faire une fonction update", 5, w7.getId(),
                        PriorityStatus.LOW.getStatus(), new Date());
                w7.addCard(t14);
                taskCardRepository.save(t14);
                System.out.println("card crées");
                wrapperRepository.save(w1);
                wrapperRepository.save(w2);
                wrapperRepository.save(w3);
                wrapperRepository.save(w4);
                wrapperRepository.save(w5);
                wrapperRepository.save(w6);
                wrapperRepository.save(w7);

                projectRepository.save(p1);
                projectRepository.save(p2);
                projectRepository.save(p3);
                System.out.println("entités persistées");
        }
}
