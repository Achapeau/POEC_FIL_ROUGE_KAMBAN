package com.ran.trello;

import com.ran.trello.Model.CreateData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class PoecFilRougeKambanApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(PoecFilRougeKambanApplication.class, args);
		CreateData createData = new CreateData();
		createData.initData(context);
	}
}
