import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AssayModule } from './module/Assay.module';
import { AssaytypeModule } from './module/Assaytype.module';
import { CategoryModule } from './module/Category.module';
import { CategoryfunctionModule } from './module/Categoryfunction.module';
import { LigandModule } from './module/Ligand.module';
import { LigandTypeModule } from './module/LigandType.module';
import { LigandVersionModule } from './module/Ligandversion.module';
import { MeasurementModule } from './module/Measurement.module';
import { OriginalPrefixModule } from './module/Originalprefix.module';
import { PersonModule } from './module/person.module';
import { ReportsModule } from './module/Report.module';
import { RoleModule } from './module/role.module';
import { RouteOfAdministartionModule } from './module/Routeofadministartion.module';
import { SystemPropertiesModule } from './module/system-properties.module';
import { TaskallocationModule } from './module/Taskallocation.module';
import { ToxicityModule } from './module/Toxicity.module';
import { TypeModule } from './module/Type.module';
import { UnitlowendvalueModule } from './module/Unitlowendvalue.module';
import { UnitSingleValueModule } from './module/Unitsinglevalue.module';
import { UserModule } from './module/user.module';



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            envFilePath: ['.env.configuration.dev'],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
            ({
                type: 'mysql',
                synchronize: false,
                host: configService.get<string>('DATABASE_HOST'),
                port: Number(configService.get<string>('DATABASE_PORT')),
                username: configService.get<string>('DATABASE_USER_NAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                autoLoadEntities: true,
                entities: ['../dist/entity/*.entity.{ts,js}'],
                subscribers: ['../dist/entity/*.entity.{ts,js}'],
                migrations: ['../dist/entity/*.entity.{ts,js}'],
                namingStrategy: new SnakeNamingStrategy(),
            } as TypeOrmModuleOptions),
        }),
        AuthModule,
        MailModule,
        SystemPropertiesModule,
        PersonModule,
        RoleModule,
        UserModule,
        AssayModule,
        AssaytypeModule,
        CategoryModule,
        CategoryfunctionModule,
        LigandModule,
        LigandTypeModule,
        LigandVersionModule,
        MeasurementModule,
        OriginalPrefixModule,
        RouteOfAdministartionModule,
        ToxicityModule,
        TypeModule,
        UnitlowendvalueModule,
        UnitSingleValueModule,
        ReportsModule,
        TaskallocationModule
    ],
    
      
})
export class AppModule { }
